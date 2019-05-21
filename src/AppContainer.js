import React, { useState, useEffect } from "react";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import * as secretsApi from './services/secretsApi';
import Title from './components/Title';
import SecretsList from './components/SecretsList';
import SecretListItem from './components/SecretListItem';
import SecretDetails from './components/SecretDetails';
import SecretTabHeader from './components/SecretTabHeader';
import SecretTabText from './components/SecretTabText';
import IconButton from './components/IconButton';

import NewSecretTab from './components/NewSecretTab';
import SecretsTab from './components/SecretsTab';
import ErrorMessage from './components/ErrorMessage';


import { ToastContainer, toast } from 'react-toastify';

const AppContainer = () => {
  const [secrets, setSecrets] = useState([]);
  const [secretsLoading, setSecretsLoading] = useState(false);
  const [newSecret, setNewSecret] = useState({name: '', text: ''});
  const [selectedSecretID, setSelectedSecretID] = useState(null);
  const [secret, setSecret] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newSecretTab, setNewSecretTab] = useState(false);
  const [showError, setShowError] = useState(false);
  const errorMessages = [
    "An existing secret with that name already exists, try a different name."
  ];

  //load secrets
  useEffect(() => {
    async function loadData() {
      setSecretsLoading(true);
      const data = await secretsApi.getAllSecrets();
      setSecrets(data);
      setSecretsLoading(false)
    }
    loadData()
  }, []);

  //load secret details
  useEffect(() => {
    async function loadData() {
      const data = await secretsApi.getSecret(selectedSecretID);
      setSecret(data);
    }
    if (selectedSecretID) {
      loadData()
    }
  }, [selectedSecretID]);


  //handle moving between tabs
  useEffect(() => {
    setSelectedSecretID(null);
    setNewSecret({ name: '', text: '' })
    setShowError(false);
  }, [newSecretTab]);

  function handleSelectSecret(id) {
    selectedSecretID === id ? setSelectedSecretID(null) : setSelectedSecretID(id);
    setEditMode(false)
  }

  function handleEditMode() {
    setEditMode(!editMode)
  }
  
  function handleInput(inputOf) {
    return function inputChange(value) {
      editMode ? setSecret({ ...secret, [inputOf]: value }): setNewSecret({ ...newSecret, [inputOf]: value})
    }
  }

  async function handleSubmitNewSecret() {

    const isUnique = checkNameIsUnique(newSecret.name, secrets);
    if (isUnique) {
      const data = await secretsApi.addSecret(newSecret);
      setSecrets([...secrets, data]);    
      handleCancelNewSecret();
      toast.success('Secret successfully added.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setShowError(true);
    }
    
  }

  function handleCancelNewSecret() {
    setNewSecret({ name: '', text: '' });
    setNewSecretTab(false);
    setShowError(false);
  }

  async function handleUpdateSecret() {
    const modidfySecrets = secrets.filter(item => item.id !== secret.id);
    const isUnique = checkNameIsUnique(secret.name, modidfySecrets);
    if (isUnique) {
      const data = await secretsApi.updateSecret(secret);
      setSecrets(secrets.map((secret) => secret.id === data.id ? data : secret));
      setSecret(data);
      setEditMode(!editMode);
      toast.success('Secret successfully updated.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setShowError(true);
    }
  }

  function handleCancelEdit() {
    setEditMode(!editMode);
    setShowError(false);    
  }

  async function handleDeleteSecret() {
    const res = await secretsApi.deleteSecret(secret.id);
    if(res && res.message) {
      const data = await secretsApi.getAllSecrets();
      setSecrets(data);
      setSecretsLoading(false)
      toast.success('Secret successfully removed.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setSelectedSecretID(null);
    setEditMode(!editMode);
  }


  function checkNameIsUnique(name, secretsInit) {
    const filtered = secretsInit.filter(secret => secret.name === name);
    return filtered.length > 0 ? false : true;
  }


  return (
    <div className="App container">
      <div className="container">
        <ToastContainer
          position="top-right"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
          <div className="d-flex justify-content-between">
            <Title title={"Secrets Manger"} />
            <div className="btn-group btn-group-sm" role="group">
              <IconButton
                label={"add"}
                isActive={newSecretTab}
                onClick={() => setNewSecretTab(true)}
                
              />
              <IconButton
                label={"Secrets List"}
                isActive={!newSecretTab}
                onClick={() => setNewSecretTab(false)}

              />
            </div>
          </div>
        <hr />
      </div>
      {
        !newSecretTab &&
        <SecretsTab
          left={
            <SecretsList>
              {
                !secretsLoading && secrets.map(item => (
                  <SecretListItem key={item.id} secretId={item.id} secretName={item.name} isActive={selectedSecretID === item.id} onClick={handleSelectSecret} />
                ))
              }

            </SecretsList>
          }
          right={
            selectedSecretID ? (
              <SecretDetails key={secret.id}>
                <SecretTabHeader name={secret.name} createdAt={secret.createdAt} allowEdit={editMode} onChange={handleInput("name")} />
                <SecretTabText text={secret.text} allowEdit={editMode} onChange={handleInput("text")} />
                
                {
                  editMode ? (
                    <div>
                      <div className="btn-group float-left animated fadeIn">
                        <button type="button" className="btn btn-light" onClick={handleDeleteSecret}>Delete</button>
                      </div>

                      <div className="btn-group float-right animated fadeIn" role="group">
                        <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                        <button type="button" className="btn btn-warning" onClick={handleUpdateSecret}>Save</button>
                      </div>
                      {
                        showError &&
                        <ErrorMessage msg={errorMessages[0]} />
                      }
                    </div>               
                  ) : (
                      <div className="animated fadeIn float-right">
                        <IconButton
                          label={"edit"}
                          isDisabled={!selectedSecretID}
                          onClick={handleEditMode}
                        />
                      </div>
                    )
                }
                
              </SecretDetails>
            ) : (
                <SecretDetails>
                  <SecretTabText text={"Mange your secrets"} />
                </SecretDetails>
              )
          }
        />
      }
      {
        newSecretTab &&
        <NewSecretTab>
          <SecretDetails key={'new'}>
            <SecretTabHeader name={newSecret.name} allowEdit={true} onChange={handleInput("name")} />
            <SecretTabText text={newSecret.text} allowEdit={true} onChange={handleInput("text")} />
            <div className="btn-group animated fadeIn float-right" role="group">
              <button type="button" className="btn btn-secondary" onClick={handleCancelNewSecret}>Cancel</button>
              <button type="button" className="btn btn-warning" disabled={newSecret.name === ''} onClick={handleSubmitNewSecret}>Save</button>
            </div>
            {
              showError &&
                <ErrorMessage msg={errorMessages[0]}/>
            }
          </SecretDetails>
        </NewSecretTab>
      }
      </div>
  );
}

export default AppContainer;
