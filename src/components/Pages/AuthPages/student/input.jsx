import React from 'react';
import { Form } from 'reactstrap'

import '../css/input.css'

const InputForm = (props) => {
    const { setQ, q } = props
    return (
        <Form className="d-flex flex-row-reverse">
            <input id="myInput" placeholder="Search....." className="col-md-6 col-sm-12 pull-right lg" type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        </Form>
    );
}

export default InputForm;