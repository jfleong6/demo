package com.logitrack.service;

import com.logitrack.model.Usuario;
import java.util.Optional;

public interface UsuarioService {
    Optional<Usuario> findByUsername(String username);
}
