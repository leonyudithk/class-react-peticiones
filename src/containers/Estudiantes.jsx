import React, { Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { BsFillTrashFill } from "react-icons/bs";


const url = "http://localhost:3005/data/"

class Estudiantes extends Component {

    //---Paso 1---- creo el constructor
    constructor() {
        super()
        this.state = {
            data: [],
            loading: true,
            id: '',
            modal: false
        }
    }

    //Paso 2--- Hacer el montaje de los estados.
    componentDidMount() {
        this.peticionGet()
    }

    //paso 2.1 -- crear la peticion get a la api para consuir y modifcar mi estado
    peticionGet = async () => {
        let { data } = await axios.get(url)

        this.setState({
            //dataState : [DatadelaUrl]
            data,
            loading: false
        })
        console.log(this.state.data)
    }

    peticionDelete = async (id)=>{

        try{
            await axios.delete(`${url}${id}`)
            this.peticionGet()
           
        }
        catch(error){
            alert(error)
        }
        
        //cierre el modal
        this.setState({modal: false})


        
    }
    render() {
        return (
            <div style={{ height: '100vh', margin: '5%' }} className='d-flex justify-content-center align-item-center'>
                {
                    this.state.loading
                        ?
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Documento</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Teléfono</th>
                                        <th>Dirección</th>
                                        <th>Foto</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data.map((est) => {
                                            const { id, documento, nombres, apellidos, celular, direccion, imagen } = est
                                            return (
                                                <tr key={id}>
                                                    <td>{id}</td>
                                                    <td>{documento}</td>
                                                    <td>{nombres}</td>
                                                    <td>{apellidos}</td>
                                                    <td>{celular}</td>
                                                    <td>{direccion}</td>
                                                    <td><img src={imagen} alt="" style={{ width: '40px' }} /></td>
                                                    <td> 
                                                            <Button variant="danger" onClick={()=> this.setState({ 
                                                                modal: true,
                                                                id,
                                                            })}>
                                                            <BsFillTrashFill />
                                                            </Button>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                        )}

                                </tbody>
                            </Table>
                        </div>

                }

                <Modal show={this.state.modal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Esta Informacion se va Eliminar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseas eliminar a este Estudiante?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={() =>{this.peticionDelete(this.state.id)}}>
                            Si
                        </Button>
                        <Button variant="danger" onClick={()=> this.setState({modal: false})} >
                            No
                        </Button>
                       
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Estudiantes;