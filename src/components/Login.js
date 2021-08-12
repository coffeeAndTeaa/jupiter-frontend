import {Button, Form, Input, message, Modal} from 'antd';
import React from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {login} from '../utils';

class Login extends React.Component {
    state = {
        displayModal : false
    }

    signinOnClick = () => {
        this.setState({
            displayModal : true,
        })
    }

    handleCancel = () => {
        this.setState({
            displayModal : false,
        })
    }

    onFinish = (data) => {
        login(data)
            .then((data) => {
                this.setState({
                    displayModal : false,
                })
                message.success(`welcome back, ${data.name}`);
                this.props.onSuccess();
            }).catch((err) => {
                message.error(err.message);
            })
    }
    render = () => {
        return (
            <>
                <Button 
                shape='round' 
                onClick={this.signinOnClick}
                style={{
                    marginRight: '20px'
                }}
                >Login</Button>
                <Modal 
                    title="log in"
                    visible={this.state.displayModal}
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                > 
                <Form
                    name="normal_login"
                    onFinish={this.onFinish}
                    reserve={false}
                >
                    <Form.Item
                        name="user_id"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input 
                        prefix={<UserOutlined />} placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!'}]}
                    >
                        <Input 
                         prefix={<LockOutlined />}
                         placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    
                </Form>
                </Modal>
            </>
        );

    }
}

export default Login;