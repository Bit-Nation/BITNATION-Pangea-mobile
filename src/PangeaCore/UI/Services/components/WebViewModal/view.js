import React from 'react';
import { View, Image, WebView, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import AssetsImages from 'pangea-common-reactnative/assets/AssetsImages';

const modal = ({ isShowWebViewModal, setIsShowWebViewModal, selectedItem: { uri } = {} }) => (
  <Modal isVisible={isShowWebViewModal}>
    <View>
      <TouchableHighlight
        onPress={() => { setIsShowWebViewModal(false); }}
      >
        <Image source={AssetsImages.closeIcon} />
      </TouchableHighlight>
    </View>

    <WebView
      source={{ uri }}
    />

  </Modal>
);

modal.propTypes = {
  isShowWebViewModal: PropTypes.bool,
  setIsShowWebViewModal: PropTypes.func,
  selectedItem: PropTypes.shape({
    uri: PropTypes.string,
  }),
};

export default modal;
