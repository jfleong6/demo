package com.logitrack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard"; // Vista Thymeleaf o el nombre de tu plantilla HTML
    }
}
