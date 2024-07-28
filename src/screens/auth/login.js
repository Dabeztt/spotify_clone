import React from 'react'
import { loginEndpoint } from '../../nhaccuatui.js'
import '../auth/login.css'

export default function Login() {
    return (
        <div className='login-page'>
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/2/2b/NhacCuaTui_2022logo.png'
                alt='logo-nhaccuatui'
                className='logo'
            />
            <a href={loginEndpoint}>
                <div className='login-btn'>
                    Đăng nhập
                </div>
            </a>
        </div>
    )
}
