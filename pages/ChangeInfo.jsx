import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'

const ChangeInfo = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    function checkPass(repass) {
        (repass==pass)?console.log(`đúng pass`):alert(`Sai mật khẩu`);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <Helmet title="Đăng ký">
            <Section>
                <SectionTitle>
                    đổi mật khẩu
                </SectionTitle>
                <SectionBody>
                    <div className="auth-form-container">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <label className="login-label"  htmlFor="password">Mật khẩu cũ</label>
                            <input className="login-input"  value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                            <label className="login-label"  htmlFor="password">Mật khẩu mới</label>
                            <input className="login-input"  value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                            <label className="login-label"  htmlFor="password">Nhập lại mật khẩu mới</label>
                            <input className="login-input"  onBlur={(e) => checkPass(e.target.value)} type="password" placeholder="********" id="repassword" name="repassword" />
                            <button className="login-btn" type="submit">Đăng ký</button>
                        </form>
                    </div>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default ChangeInfo

