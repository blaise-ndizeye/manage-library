import React from 'react';
import { Form } from 'reactstrap'

import '../css/input.css'

const InputForm = (props) => {
    const { setQ, q } = props
    return (
        <Form>
            <input id="myInput" placeholder="Search....." className="col-sm-12 col-md-12 pull-right lg" type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        </Form>
    );
}

export default InputForm;