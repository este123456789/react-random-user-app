import React, { useEffect, useState } from 'react';

const RandomUsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [mostUsedLetter, setMostUsedLetter] = useState('');

    useEffect(() => {
        const fetchRandomUsers = async (numUsers) => {
            try {
                const response = await fetch(`https://randomuser.me/api/?results=${numUsers}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data.results); // Guardar los usuarios en el estado
            } catch (error) {
                console.error('Error fetching random users:', error);
            }
        };

        fetchRandomUsers(5); // Llamar a la función para obtener 5 personas
    }, []); // Ejecutar solo una vez al montar el componente

    useEffect(() => {
        // Función para calcular la letra más utilizada en nombres completos
        const calculateMostUsedLetter = () => {
            let nameString = '';
            users.forEach(user => {
                const fullName = `${user.name.first} ${user.name.last}`;
                nameString += fullName.toLowerCase(); // Convertir a minúsculas
            });

            // Contar la frecuencia de cada letra
            const letterMap = new Map();
            for (const char of nameString) {
                if (char.match(/[a-z]/i)) { // Solo contar letras del alfabeto
                    const count = letterMap.has(char) ? letterMap.get(char) + 1 : 1;
                    letterMap.set(char, count);
                }
            }

            // Encontrar la letra con la frecuencia más alta
            let maxCount = 0;
            let mostUsedLetter = '';
            letterMap.forEach((count, letter) => {
                if (count > maxCount) {
                    maxCount = count;
                    mostUsedLetter = letter;
                }
            });

            return mostUsedLetter.toUpperCase(); // Retorna la letra más utilizada en mayúsculas
        };

        if (users.length > 0) {
            const letter = calculateMostUsedLetter();
            setMostUsedLetter(letter);
        }
    }, [users]); // Ejecutar cada vez que cambia el estado de 'users'

    return (
        <div>
            <h2>Usuarios Aleatorios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo Electrónico</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {mostUsedLetter && (
                <p>Letra más utilizada en nombres completos: {mostUsedLetter}</p>
            )}
        </div>
    );
};

export default RandomUsersComponent;
