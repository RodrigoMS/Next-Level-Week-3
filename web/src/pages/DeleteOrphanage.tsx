import React, { useEffect} from 'react';
import {useHistory, useParams } from 'react-router-dom';

import '../styles/pages/create-orphanage.css';
import api from '../services/api';

interface OrphanageParams {
  id: string;
}

export default function DeleteOrphanage() {
    const history = useHistory();
    const params = useParams<OrphanageParams>();


    useEffect(() => {
        api.delete(`orphanages/${params.id}`).then(response => {
            alert('Cadastro deletado com sucesso.');
        });
        }, [params]);

    history.push('/app');

    console.log(params)

    return (
        <div></div>
    )
}
