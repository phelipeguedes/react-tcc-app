import './Header.css';
import React from 'react';

export default props =>
    /* d-none: header não aparecerá em dispositivos móveis
        d-sm-flex: dispositivos de tamanho 'sm' usarão o display-flex */
    <header className="header d-none d-sm-flex flex-column">
        <h2 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h2>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>