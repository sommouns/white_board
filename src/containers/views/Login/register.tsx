import { Button, Card, Checkbox, Divider, Input, Modal, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons'
import { AGREEMENT, AGREEMENT_NAME, phoneCodeOptions } from 'conf';
import history from '@shared/App/ht'


export const Register = observer(() => {
    const [phoneCode, setPhoneCode] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(0);
    const [pwdVisible, setPwdVisible] = useState<boolean>(false);
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    useEffect(() => {
        if (countdown === 60) {
            var interval = setInterval(() => {
                setCountdown(countdown => {
                    if (countdown <= 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return (countdown - 1);
                });
            }, 1000);
        }
    }, [countdown])
    const sendVerifyCode = async () => {
        const query = phoneCode + phone;
        console.log(query);
        await setTimeout(() => {
            setCountdown(60)
        }, 2000);
    }
    const [agreementCheckbox, setAgreementCheckbox] = useState(false);

    const [agreementModalVisible, setAgreementModalVisible] = useState(false);
    const [agreementName, setAgreementName] = useState('');
    const openAgreement = useCallback((agreementName) => {
        setAgreementModalVisible(true);
        setAgreementName(agreementName);
    }, []);
    return <div className='login-page'>
        <div className="login-page_logo"></div>
        <div>
            <Card style={{ width: 520 }}>
                <div className='login-page_title' style={{ marginBottom: 24 }}>用户注册</div>
                <div className="login-page_main">
                    <div className="login-page_main_form">
                        <div className="login-page_main_form_item">
                            <Input placeholder="昵称 (2-20位)" />
                        </div>
                        <div className="login-page_main_form_item">
                            <Select
                                defaultValue="+86"
                                style={{ width: 110 }}
                                onChange={(e) => {
                                    console.log(e);
                                }}
                                optionLabelProp="value"
                                className="phone-code_selector"
                                popupClassName='entry-selector_popup'
                            >
                                {phoneCodeOptions.map(item => (
                                    <Select.Option key={item.label} value={item.value} label={item.value}>
                                        <div className='phone-code_options'>
                                            {item.label}
                                        </div>
                                    </Select.Option>
                                ))}
                            </Select>
                            <Input placeholder='请输入手机号' style={{ marginLeft: 14 }} value={phone} onChange={(e) => handlePhoneChange(e)}></Input>
                        </div>

                        <div className="login-page_main_form_item">
                            <Input addonAfter={(
                                <>
                                    {
                                        countdown ? <div style={{ color: '#86909C' }}>重新获取 {countdown}s</div> : <div onClick={() => sendVerifyCode()}>
                                            获取验证码
                                        </div>
                                    }
                                </>
                            )} defaultValue="" placeholder='请输入手机验证码' />
                        </div>
                        <div className="login-page_main_form_item">
                            <Input placeholder="请输入邮箱地址" />
                        </div>
                        <div className="login-page_main_form_item">
                            <Input.Password placeholder="设置密码 (6-20位，区分大小写)" />
                        </div>
                        <div className="login-page_main_form_item">
                            <Checkbox onChange={() => {
                                setAgreementCheckbox(true)
                            }}>
                                <div className='login-page_desc' style={{ marginTop: 0, marginBottom: 0 }}>
                                    我已阅读并同意
                                    <span onClick={() => openAgreement(AGREEMENT_NAME.APPLE)} className='login-page_desc--link'>Adtrion服务许可协议</span>和
                                    <span onClick={() => openAgreement(AGREEMENT_NAME.PRIVATE)} className='login-page_desc--link'>隐私政策</span>
                                </div>
                            </Checkbox>
                        </div>
                    </div>
                </div>
                <div className='login-page_main_btn'>
                    <Button type="primary">立即注册</Button>
                </div>
                <div className='login-page_main_other'>
                    <Button type='link' onClick={() => history.push('/signin')}>登录现有账号</Button>
                    <Divider type="vertical" />
                    <Button type='link' onClick={() => history.replace('/')}>返回首页</Button>
                </div>
            </Card>
            <Modal title={null}
                footer={null}
                open={agreementModalVisible}
                className="agreement"
                width={700}
                closable={false}>

                <div className='agreement_title'>
                    {AGREEMENT[agreementName] && AGREEMENT[agreementName].title}
                </div>

                <div className='agreement_content' key={agreementName}>
                    {AGREEMENT[agreementName] && AGREEMENT[agreementName].content}
                </div>

                <div className='agreement_confirm'>
                    <Button onClick={() => setAgreementModalVisible(false)} type="primary">我已知悉</Button>
                </div>
            </Modal>
        </div>
    </div>
});