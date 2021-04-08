import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../store/actions/employees';
import ConfirmDialog from '../dialog/ConfirmDialog';
import FormDialog from '../dialog/FormDialog';
import View from './View';

import "@reach/dialog/styles.css";

function List (props) {
    const [employee, setEmployee] = useState(null);
    const _confirmDialog = useRef(null);
    const _formDialog = useRef(null);
    const { employees, error } = props;

    function confirmDelete (employee) {
        setEmployee(employee);
        _confirmDialog.current.open('Confirm Delete', `Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`);
    }

    function addEmployee () {
        _formDialog.current.open();
    }

    function onSubmit (formData) {
        const employee = {
            id: Math.max(...props.employees.map(e => e.id)) +1,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email
        }
        
        props.addEmployee(employee);
    }

    function onCancel (cancelled) {
        if (!cancelled) {
            props.deleteEmployee(employee);
        }
    }

    useEffect(() => {
        props.fetchEmployees();
    });


    let displayError = null;
    let employeesDisplay = <tr><td colspan="2">No Employees</td></tr>;

    if (error) {
        displayError = <div>Error: {error}</div>
    }

    if (employees) {
        employeesDisplay = employees.map(e => {
            return (
                <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.first_name}</td>
                    <td>{e.last_name}</td>
                    <td>{e.email}</td>
                    <td><button className="btn btn-danger" onClick={() => confirmDelete(e)}>X</button></td>
                </tr>
            )
        });
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-10">
                     <h1 className="display-1">Employee List</h1>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-8">{displayError}</div>
            </div>
            <br />
            <div className="row">
                <div className="col-10">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th><button className="btn btn-primary" onClick={() => addEmployee()}>+</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeesDisplay}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmDialog
                ref={_confirmDialog}
                onCancel={onCancel}
            />
            <FormDialog
                ref={_formDialog}
                onSuccess={onSubmit}>
                <View
                    key="EmployeeView"
                />
            </FormDialog>
        </div>
    );
}

function mapStateToProps(state) {
    const { employees } = state;

    return {
        employees: employees.list,
        error: employees.error
    }
}

export default compose(
    connect(mapStateToProps, actions)
)(List);