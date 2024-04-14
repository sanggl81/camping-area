import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Modal, Form, Input, Row, notification } from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import userApi from "../../apis/userApi";
import "./login.css";

const Login = () => {
  const [isLogin, setLogin] = useState(true);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [forgotPasswordForm] = Form.useForm();
  const [loginError, setLoginError] = useState(false); // Thêm state để điều khiển việc hiển thị thông báo lỗi
  let history = useHistory();

  const onFinish = values => {
    userApi.login(values.email, values.password)
      .then(function (response) {
        console.log(response);
        if (response.user.role === "isClient" && response.user.status !== "noactive") {
          history.push("/home");
        } else {
          setLoginError(true); // Đặt state loginError thành true để hiển thị thông báo lỗi
          notification.error({
            message: `Thông báo`,
            description:
              'Bạn không có quyền truy cập vào hệ thống',
          });
        }
      })
      .catch(error => {
        setLoginError(true); // Đặt state loginError thành true để hiển thị thông báo lỗi
        console.log("email or password error" + error)
      });
  }

  const handleForgotPasswordSubmit = async () => {
    const values = await forgotPasswordForm.validateFields();
    console.log(values.email);

    try {
      const data = {
        "email": values.email
      }
      await userApi.forgotPassword(data);
      notification.success({
        message: 'Thông báo',
        description: 'Đã gửi đường dẫn đổi mật khẩu qua email.',
      });
      setForgotPasswordModalVisible(false);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra khi gửi đường dẫn đổi mật khẩu.',
      });
      console.error('Forgot password error:', error);
    }
  };

  const showForgotPasswordModal = () => {
    setForgotPasswordModalVisible(true);
  };

  const handleForgotPasswordCancel = () => {
    setForgotPasswordModalVisible(false);
  };

  return (
    <div className='login-page'>
      <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="px-6 py-4">
          <div class="flex justify-center mx-auto">
            <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
          </div>

          <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

          <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Đăng nhập hoặc tạo tài khoản</p>

          <Row style={{ margin: 'auto' }}>
            <Form
              style={{ marginBottom: 8, width: '100%' }}
              name="normal_login"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <>
                {loginError && ( // Hiển thị thông báo lỗi khi loginError là true
                  <Form.Item style={{ marginBottom: 16 }}>
                    <Alert
                      message="Tài khoản hoặc mật khẩu sai"
                      type="error"
                      showIcon
                    />
                  </Form.Item>
                )}
              </>
              <Form.Item
                style={{ marginBottom: 20 }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!',
                  },
                ]}
              >
                <Input
                  style={{ height: 34, borderRadius: 5 }}
                  prefix={<UserOutlined className="siteformitemicon" />}
                  placeholder="Email"
                />
              </Form.Item >
              <Form.Item
                style={{ marginBottom: 8 }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="siteformitemicon" />}
                  type="password"
                  placeholder="Password"
                  style={{ height: 34, borderRadius: 5 }}
                />
              </Form.Item>

              <Form.Item style={{ width: '100%', marginTop: 30 }}>
                <Button className="button" type="primary" htmlType="submit"  >
                  Đăng Nhập
                </Button>
              </Form.Item>

            
            </Form>
          </Row>
        </div>

        <div class="flex items-center justify-center pt-4 text-center bg-gray-50 dark:bg-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-200">Bạn chưa có tài khoản? </span>
          <Link to="/register" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Đăng ký</Link>
        </div>
        <div class="flex items-center justify-center py-3 text-center bg-gray-50 dark:bg-gray-700">
          <Link to="/home" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Quay lại trang chính</Link>
        </div>
      </div>

      <Modal
        title="Quên mật khẩu"
        visible={forgotPasswordModalVisible}
        onCancel={handleForgotPasswordCancel}
        footer={[
          <Button key="back" onClick={handleForgotPasswordCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleForgotPasswordSubmit}>
            Gửi đường dẫn đổi mật khẩu
          </Button>,
        ]}
      >
        <Form
          name="forgot_password"
          onFinish={handleForgotPasswordSubmit}
          form={forgotPasswordForm}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Email không hợp lệ',
              },
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
        </Form>
      </Modal>
      </div>
  );
};

export default Login;
