import React from 'react';
import {message, Button, Modal} from 'antd';
import {WrappedCreatePostForm} from './CreatePostForm';
import $ from 'jquery';
import {API_ROOT, AUTH_PREFIX, POS_KEY, TOKEN_KEY} from '../constants';

export class CreatePostButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.form.validateFields((error, values) => {
      if (!error) {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        const formData = new FormData();
        formData.set('lat', lat + Math.random() * 0.1 - 0.05);
        formData.set('lon', lon + Math.random() * 0.1 - 0.05);
        formData.set('message', values.message);
        formData.set('image', values.image[0]);
        this.setState({
          confirmLoading: true,
        });
        $.ajax({
          url: `${API_ROOT}/post`,
          method: 'POST',
          data: formData,
          headers: {
            Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
          },
          processData: false,
          contentType: false,
          dataType: 'text',
        }).then((response) => {
          message.success('Success');
        }, (error) => {
          message.error(error.responseText);
        }).then(() => {
          this.props.loadNearbyPosts().then(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.form.resetFields();
          });
        }).catch((error) => {
          message.error('Failed to create a post.');
          console.log(error);
        });
      }
    });


  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create New Post</Button>
        <Modal title="Create New Post"
               visible={visible}
               onOk={this.handleOk}
               okText="Create"
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               cancelText="Cancel"
        >
          <WrappedCreatePostForm ref={this.saveFormRef}/>
        </Modal>
      </div>
    );
  }
}
