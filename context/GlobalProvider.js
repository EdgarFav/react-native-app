import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../lib/appwrite'

const GlobalContext = createContext() //Creamos un contexto global
export const useGlobalContext = () => useContext(GlobalContext) //Creamos un hook para usar el contexto global 'useGlobalContext'

const GlobalProvider = ({ children }) => { //Creamos un provider global, que proveerá el contexto global

    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState(null)
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLogged(true);
                    setUser(res);
                } else {
                    setIsLogged(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider //Proveemos el contexto global
            value={{ //Exportamos los valores del contexto global que queremos compartir
                Loading,
                isLogged,
                setIsLogged,
                user,
                setUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider