[[ -n ${_y2s:-} ]] && return
readonly _y2s=loaded

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
source $DIR/nano.bash

_expand_expression () {
  local expression=$1
  local ref=$2
  local indent='( *)'
  local key='([[:alnum:]_]+)'
  local space='[[:space:]]*'

  expression=${expression// /$space}
  expression=${expression/<key>/$key}
  expression=${expression/<indent>/$indent}
  printf -v expression '^%s$' "$expression"

  local "$ref" || return
  _ret "$ref" "$expression"
}

lookup () {
  local _key=$1
  local _ref=${2:-}
  local _assignment
  local _refu
  local _struct=${_key%%.*}

  _key=${_key#*.}
  _refu=$_struct[$_key]
  [[ -z $_ref ]] && { _puts "${!_refu}"; return ;}
  [[ ${!_refu} != '('*')' ]] && {
    printf -v "$_ref" "${!_refu}"
    return
  }
  printf -v _assignment "%s=%s" "$_ref" "${!_refu}"
  eval "$_assignment"
}

_parse () {
  local datatype=$1
  local style=$2

  [[ -z ${curdatatype:-} || $curdatatype  == "$datatype"  ]] || return
  [[ -z ${curdatatype:-} && $datatype     == 'array'      ]] && key=0
  curdatatype=$datatype
  case $datatype in
    'array' ) _parse_array_values ;;
    'hash'  ) _parse_hash_values  ;;
  esac
  case $style in
    'double'  ) _parse_double_quoted_line ;;
    'plain'   ) _parse_plain_line         ;;
    'single'  ) _parse_single_quoted_line ;;
  esac
}

_parse_array_values () {
  indent=$(( ${#BASH_REMATCH[1]}/2 ))
  value=${BASH_REMATCH[2]}
}

_parse_double_quoted_line () {
  ! [[ $value =~ ([^\\]+|^)(\\\\)*\" ]] || return
  value=${value//\\\"/\"}
  printf -v value '%b' "$value"
}

_parse_hash_values () {
  indent=$(( ${#BASH_REMATCH[1]}/2 ))
  key=${BASH_REMATCH[2]}
  value=${BASH_REMATCH[3]}
}

_parse_line () {
  [[ $line =~ $hash_double_quoted_expression    ]] && { _parse hash   double  ; return ;}
  [[ $line =~ $hash_single_quoted_expression    ]] && { _parse hash   single  ; return ;}
  [[ $line =~ $hash_start_and_plain_expression  ]] && { _parse hash   plain   ; return ;}
  [[ $line =~ $array_double_quoted_expression   ]] && { _parse array  double  ; return ;}
  [[ $line =~ $array_single_quoted_expression   ]] && { _parse array  single  ; return ;}
  [[ $line =~ $array_plain_expression           ]] && { _parse array  plain   ; return ;}
  return 1
}

_parse_plain_line () {
  ! [[ $value == '"' || $value == "'" ]] || return
}

_parse_single_quoted_line () {
  ! [[ $value =~ ([^\']+|^)(\'\')*\' ]] || return
  value=${value//\'\'/\'}
}

_setup_expressions () {
  array_double_quoted_expression='<indent>- "[value]" '
  array_plain_expression='<indent>- [value] '
  array_single_quoted_expression="<indent>- '[value]' "

  array_double_quoted_expression=${array_double_quoted_expression/\[value]/$quoted_value}
  array_plain_expression=${array_plain_expression/\[value]/$plain_value}
  array_single_quoted_expression=${array_single_quoted_expression/\[value]/$quoted_value}

  _expand_expression "$array_double_quoted_expression"  array_double_quoted_expression
  _expand_expression "$array_plain_expression"          array_plain_expression
  _expand_expression "$array_single_quoted_expression"  array_single_quoted_expression

  hash_double_quoted_expression='<indent><key> : "[value]" '
  hash_single_quoted_expression="<indent><key> : '[value]' "
  hash_start_and_plain_expression='<indent><key> : [value] '

  hash_double_quoted_expression=${hash_double_quoted_expression/\[value]/$quoted_value}
  hash_single_quoted_expression=${hash_single_quoted_expression/\[value]/$quoted_value}
  hash_start_and_plain_expression=${hash_start_and_plain_expression/\[value]/$plain_value}

  _expand_expression "$hash_double_quoted_expression"   hash_double_quoted_expression
  _expand_expression "$hash_start_and_plain_expression" hash_start_and_plain_expression
  _expand_expression "$hash_single_quoted_expression"   hash_single_quoted_expression
}

_value_of () {
  local _source=$1
  local _ref=$2
  local _value

  _value=$(declare -p "$_source" 2>/dev/null) || return
  _value=${_value#*=\'}
  _value=${_value%\'}
  printf -v "$_ref" '%s' "$_value"
}

_y2s_rec () {
  local ref=$1
  local -a resulth
  local -a hash
  local curindent=$curindent
  local curdatatype
  local indent
  local key
  local value

  while [[ $wait == 'true' ]] || IFS= read -r line; do
    wait=false
    _parse_line   || return
    if (( indent == curindent )); then
      if [[ -n $value ]]; then
        hash[$key]=$value
      else
        (( curindent += 1 )) ||:
        _y2s_rec resulth || return
        (( curindent -= 1 )) ||:
        _value_of resulth hash[$key]
        for subkey in "${!resulth[@]}"; do
          printf -v hash[$key.$subkey] '%s' "${resulth[$subkey]}"
        done
      fi
    elif (( indent < curindent )); then
      wait=true
      break
    else
      return 1
    fi
    [[ $curdatatype == 'array' ]] && (( key += 1 ))
  done

  local "$ref" || return
  _ret "$ref" hash
}

yml2struct () {
  local ref=$1
  local filename=${2:-/dev/stdin}
  local -a resulth
  local array_double_quoted_expression
  local array_plain_expression
  local array_single_quoted_expression
  local curindent=0
  local hash_double_quoted_expression
  local hash_single_quoted_expression
  local hash_start_and_plain_expression
  local plain_value='([[:graph:]]*|[[:print:]]+[[:graph:]])'
  local quoted_value='([[:print:]]*)'
  local line
  local wait=false

  _setup_expressions
  _y2s_rec resulth <"$filename" || return

  local "$ref" || return
  _ret "$ref" resulth
}