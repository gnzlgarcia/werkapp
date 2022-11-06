const registrar = (req, res) => {
    res.send('Desde API/USERS')
}

const perfil = (req, res) => {
    res.send('Desde API/USERS/PERFIL')
}

export {registrar, perfil}; 