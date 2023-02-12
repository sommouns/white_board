import { Button, Card, Divider } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons'

import history from '@shared/App/ht'

export const WechatScanLogin = observer(() => {
    const [img, setImg] = useState('123');
    return <div className='login-page'>
        <div className="login-page_logo"></div>
        <div style={{ textAlign: 'center' }}>
            <Card style={{ width: 520 }}>
                <div className='login-page_title' style={{ justifyContent: 'center' }}>扫码登录</div>
                <div className='login-page_desc'>
                    请使用微信扫描二维码登录
                </div>
                <div className='login-page_qrcode'>
                    {img ? <>
                        <img src="" alt="" />
                        <div className='login-page_qrcode_reload-mask'>
                            <ReloadOutlined style={{ fontSize: 32, marginBottom: 12 }} />
                            <div>刷新二维码</div>
                        </div></> : <div className='login-page_qrcode_loading-mask'>二维码加载中...
                    </div>}
                </div>
                <div className='login-page_main_other'>
                    <Button type='link' onClick={() => history.push('/signin')}>密码登录</Button>
                    <Divider type="vertical" />
                    <Button type='link' onClick={() => history.push('/register')}>立即注册</Button>
                    <Divider type="vertical" />
                    <Button type='link' onClick={() => history.replace('/')}>返回首页</Button>
                </div>
            </Card>
        </div>
    </div>
});