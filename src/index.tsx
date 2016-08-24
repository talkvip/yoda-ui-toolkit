import * as React from 'react';
import {render} from 'react-dom';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import Main from './demo';

render(
    <Main />,
    document.getElementById("root")
);