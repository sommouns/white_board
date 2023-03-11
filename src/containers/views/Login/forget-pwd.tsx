import { Button, Card, Divider, Input, Select, Tabs, TabsProps } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { phoneCodeOptions } from '../../../conf'
import 'react-phone-number-input/style.css'
import history from '@shared/App/ht'

enum TAB_ID {
    PHONE = '1',
    MAIL = '2'
}
export const ForgetPwdPage: React.FC = observer(() => {
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

    return <div className='login-page'>
        <div className="login-page_logo"></div>
        <div>
            <Card style={{ width: 520 }}>
                <div className='login-page_title'>找回密码</div>
                <div className='login-page_desc'>
                    你可以通过注册手机号或邮箱找回密码
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
                                    <Input.Password placeholder="设置密码 (6-20位，区分大小写)" />
                                </div>
                            </> : <>
                                <div className="login-page_main_form_item">
                                    <Input placeholder="请输入邮箱地址" />
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
                                    )} defaultValue="" placeholder='请输入邮箱验证码' />
                                </div>
                                <div className="login-page_main_form_item">
                                    <Input.Password placeholder="设置密码 (6-20位，区分大小写)" />
                                </div>
                            </>
                        }
                    </div>

                    <div className='login-page_main_btn'>
                        <Button type="primary">立即重置</Button>
                    </div>
                    <div className='login-page_main_other'>
                        <Button type='link' onClick={() => history.push('/signin')}>返回登录</Button>
                        <Divider type="vertical" />
                        <Button type='link' onClick={() => history.replace('/')}>返回首页</Button>
                    </div>
                </div>
            </Card>
        </div >
    </div >
})
