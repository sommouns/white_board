import { Button, Card, Divider, Input, Modal, Select, Tabs, TabsProps } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { AGREEMENT_NAME, AGREEMENT, phoneCodeOptions } from '../../../conf'
import history from '@shared/App/ht'

enum TAB_ID {
    PHONE = '1',
    MAIL = '2'
}

export const LoginPage: React.FC = observer(() => {
    const items: TabsProps['items'] = [
        {
            key: TAB_ID.PHONE,
            label: `手机号`,
        },
        {
            key: TAB_ID.MAIL,
            label: `邮箱`,
        }
    ];

    const [currentTab, setCurrentTab] = useState<TAB_ID>(TAB_ID.PHONE);
    const onTabChange = useCallback((val) => {
        setCurrentTab(val);
    }, []);

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
                <div className='login-page_title'>用户登录</div>
                <div className='login-page_desc'>
                    登录即代表您已阅读并同意
                    <span onClick={() => openAgreement(AGREEMENT_NAME.APPLE)} className='login-page_desc--link'>Adtrion服务许可协议</span>和
                    <span onClick={() => openAgreement(AGREEMENT_NAME.PRIVATE)} className='login-page_desc--link'>隐私政策</span>
                </div>
                <div className='login-page_main'>
                    <Tabs defaultActiveKey={currentTab} items={items} onChange={onTabChange} />
                    <div className="login-page_main_form">
                        {
                            currentTab === TAB_ID.PHONE ? <>
                                <div className="login-page_main_form_item">
                                    <Select
                                        defaultValue="+86"
                                        style={{ width: 110 }}
                                        onChange={(e) => {
                                            console.log(e);
                                        }}
                                        optionLabelProp="value"
                                        className="phone-code_selector"
                                        popupClassName="phone-code_selector_popup"
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
                                    {
                                        pwdVisible ? <Input.Password placeholder="请输入密码" /> :
                                            <Input addonAfter={(
                                                <>
                                                    {
                                                        countdown ? <div style={{ color: '#86909C' }}>重新获取 {countdown}s</div> : <div onClick={() => sendVerifyCode()}>
                                                            获取验证码
                                                        </div>
                                                    }
                                                </>
                                            )} defaultValue="" placeholder='请输入手机验证码' />
                                    }
                                </div>
                            </> : <>
                                <div className="login-page_main_form_item">
                                    <Input placeholder="请输入邮箱地址" />
                                </div>
                                <div className="login-page_main_form_item">
                                    <Input.Password placeholder="请输入密码" />
                                </div>
                            </>
                        }
                    </div>

                    <div className='login-page_main_forget-pwd'>
                        {currentTab === TAB_ID.PHONE && pwdVisible && <>
                            <Button type='link' onClick={() => setPwdVisible(false)}>验证码登录</Button>
                            <Divider type="vertical" />
                            <Button type='link' onClick={() => history.push('/forget')}>忘记密码？</Button>
                        </>}
                        {currentTab === TAB_ID.PHONE && !pwdVisible && <>
                            <Button type='link' onClick={() => setPwdVisible(true)}>密码登录</Button>
                        </>}
                        {
                            currentTab === TAB_ID.MAIL && <>
                                <Button type='link' onClick={() => history.push('/forget')}>忘记密码？</Button>
                            </>
                        }
                    </div>
                    <div className='login-page_main_btn'>
                        <Button type="primary">立即登录</Button>
                    </div>
                    <div className='login-page_main_other'>
                        <Button type='link' onClick={() => history.push('/wechat')}>微信登录</Button>
                        <Divider type="vertical" />
                        <Button type='link' onClick={() => history.push('/register')}>立即注册</Button>
                        <Divider type="vertical" />
                        <Button type='link' onClick={() => history.replace('/')}>返回首页</Button>
                    </div>
                </div>
            </Card>
        </div >
        <Modal title={null} selling-point-selector
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
    </div >
})
