import React, { useState} from 'react';

const buttonStyle = {
    width: '75px',
    marginLeft: '5px'
}

function View(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    function handleSubmit (e) {
        e.preventDefault();
        if (props.onSubmit){
            props.onSubmit({
                firstName,
                lastName,
                email
            });
        }
    }

    const error = '';
    const { onCancel } = props;

    return (
        <div className="container">
                <div className="row">
                    <form className="col-md" onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Add Employee</h1>
                        {error}
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group row">
                            <div className="col-12 d-flex justify-content-end">
                                <button className="btn btn-secondary" style={buttonStyle} onClick={onCancel}>Cancel</button>
                                <button className="btn btn-primary" style={buttonStyle}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default View;