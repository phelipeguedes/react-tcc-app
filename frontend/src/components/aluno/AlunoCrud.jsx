import React, { Component } from 'react';
import Main from '../templates/Main';
import axios from 'axios';

const headerProps = {
    icon: 'users',
    title: 'Alunos',
    subtitle: 'Cadastro de Alunos'
}

// url do backend
const baseUrl = 'http://localhost:3001/alunos';

const initialState = {
    aluno: {nome: '', matricula: '', curso: '', email: ''},
    list: []
}

export default class AlunoCrud extends Component {
    
    state = { ...initialState }

    render() {
        console.log(this.state.list)

        return (
            // passando o objeto para o componente Main
            <Main {...headerProps}>
                { this.renderForm() }
                {}
                { this.renderTable() }
            </Main>
        )
    }

    // chama a lista de alunos ao carregar a aplicação
    componentWillMount() {
        this.loadAlunos();
    }

    // lista de alunos
    loadAlunos() {
        axios(baseUrl).then(response => {
            this.setState({list: response.data});
        })
    }

    // único aluno
    load(aluno) {
        this.setState({ aluno });
    }

    save() {
        const aluno = this.state.aluno;
        const method = aluno.id ? 'put' : 'post';
        const url = aluno.id ? `${baseUrl}/${aluno.id}`: baseUrl;

        axios[method](url, aluno)
            .then(response => {
                const list = this.getUpdatedList(response.data);
                this.setState({aluno: initialState.aluno, list})
            });
    }

    // remove um aluno
    remove(aluno) {
        axios.delete(`${baseUrl}/${aluno.id}`).then(response => {
            
            // chama a lista de alunos removendo o aluno correspondente
            const list = this.getUpdatedList(aluno, false);
            this.setState({list});
        });
    }

    // atualiza a lista de usuários. 
    // o segundo parâmetro diz se o aluno será adicionado na lista ou não
    getUpdatedList(aluno, addAluno = true) {
        const list = this.state.list.filter(aln => aln.id !== aluno.id)
        
        if(addAluno)
            list.unshift(aluno);
        
        return list;
    }

    updateField(event) {
        const aluno = {...this.state.aluno }
        
        aluno[event.target.name] = event.target.value;
        this.setState({aluno});
    }    

    // tabela que exibe os alunos cadastrados
    renderTable() {
        return (
            <table className="table table-responsive mt-4">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Curso</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>                    
                        { this.renderRows() }                    
                </tbody>
            </table>
        )
    }

    // linhas da tabela
    renderRows() {
        return this.state.list.map(aluno => {
            return (
                <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.matricula}</td>
                    <td>{aluno.curso}</td>
                    <td>{aluno.email}</td>
                    
                    <td>
                        <button className="btn btn-warning" onClick={() =>                         
                            this.load(aluno)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={() =>
                            this.remove(aluno)}>
                            <i className="fa fa-trash"></i>
                        </button>                            
                    </td>
                </tr>
            )
        })
    }

    // campos do formulário
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label htmlFor="">Nome</label>
                            <input type="text" className="form-control" name="nome"
                                    value={this.state.aluno.nome}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Nome do aluno(a)"/>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label htmlFor="">Matrícula</label>
                            <input type="text" name="matricula" id="matricula"
                                    className="form-control"
                                    value={this.state.aluno.matricula}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Número da matrícula"/>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label htmlFor="">Curso</label>
                            <input type="text" name="curso" id="curso"
                                    className="form-control"
                                    value={this.state.aluno.curso}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Nome do curso"/>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" id="email"
                                    className="form-control" 
                                    value={this.state.aluno.email}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Email do aluno(a)"/>
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button type="button" className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>

            </div>
        )
    }

    // reseta o formulário
    clear() {
        this.setState({ aluno: initialState.aluno });
    }
}
