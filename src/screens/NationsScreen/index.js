import React, { Component } from 'react';
import {
  View,
  Text, SectionList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import BackgroundImage from '../../components/common/BackgroundImage';
import styles from './styles';
import NationListItem from '../../components/common/NationListItem';
import NationListHeader from '../../components/common/NationListHeader';

class NationsScreen extends Component {
  componentWillMount() {
  }

  render() {
    const groups = _.groupBy(this.props.nations, (nation) => nation.name.charAt(0));
    const sections = _.map(groups, (group, key) => {
      return {
        title: key,
        data: group,
      };
    });
    console.log(JSON.stringify(sections));

    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <SectionList
          renderItem={(item) => {
            const nation = item.item;
            return (<NationListItem text={nation.name}/>);
          }}
          keyExtractor={(item) => item.name}
          renderSectionHeader={({ section }) => <NationListHeader title={section.title}/>}
          sections={sections}
          style={styles.sectionList}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nations: state.nations.nations,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NationsScreen);
