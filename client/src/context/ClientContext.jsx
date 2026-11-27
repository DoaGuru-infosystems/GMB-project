import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { adminService } from '../services/api';

const ClientContext = createContext();

export const useClientContext = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep references to latest state to avoid fetchClients dependency changes
  const clientsRef = useRef(clients);
  const errorRef = useRef(error);

  useEffect(() => {
    clientsRef.current = clients;
    errorRef.current = error;
  }, [clients, error]);

  const fetchClients = useCallback(async (force = false) => {
    if (!force && clientsRef.current.length > 0 && !errorRef.current) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await adminService.getClients();
      setClients(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load clients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // We don't fetch clients here automatically anymore to prevent 403 for client roles
  // Each component that needs clients should call fetchClients explicitly

  const createClient = async (clientData, logoFile, setUploadingLogo) => {
    try {
      let logoUrl = null;
      if (logoFile) {
        if (setUploadingLogo) setUploadingLogo(true);
        const uploadRes = await adminService.uploadLogo(logoFile);
        logoUrl = uploadRes.url;
        if (setUploadingLogo) setUploadingLogo(false);
      }
      
      const newClient = await adminService.createClient({
        ...clientData,
        logo: logoUrl
      });
      // Refresh list to maintain consistency
      await fetchClients();
      return newClient;
    } catch (err) {
      if (setUploadingLogo) setUploadingLogo(false);
      throw err;
    }
  };

  const toggleClientStatus = async (clientId, currentStatus) => {
    try {
      await adminService.toggleClientStatus(clientId, !currentStatus);
      // Update local state directly for responsive UI
      setClients(prevClients => prevClients.map(client => 
        client.clientId === clientId ? { ...client, isActive: !currentStatus ? 1 : 0 } : client
      ));
    } catch (err) {
      throw err;
    }
  };

  const updateClient = async (clientId, clientData, logoFile, setUploadingLogo) => {
    try {
      let logoUrl = clientData.logo;
      if (logoFile) {
        if (setUploadingLogo) setUploadingLogo(true);
        const uploadRes = await adminService.uploadLogo(logoFile);
        logoUrl = uploadRes.url;
        if (setUploadingLogo) setUploadingLogo(false);
      }
      
      const updatedClient = await adminService.updateClient(clientId, {
        ...clientData,
        logo: logoUrl
      });
      await fetchClients();
      return updatedClient;
    } catch (err) {
      if (setUploadingLogo) setUploadingLogo(false);
      throw err;
    }
  };

  return (
    <ClientContext.Provider value={{
      clients,
      loading,
      error,
      fetchClients,
      createClient,
      updateClient,
      toggleClientStatus
    }}>
      {children}
    </ClientContext.Provider>
  );
};
