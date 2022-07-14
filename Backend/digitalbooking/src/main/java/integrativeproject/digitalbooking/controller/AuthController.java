package integrativeproject.digitalbooking.controller;

import integrativeproject.digitalbooking.model.dto.security.JwtDto;
import integrativeproject.digitalbooking.model.dto.security.NewUser;
import integrativeproject.digitalbooking.model.dto.security.UserLogin;
import integrativeproject.digitalbooking.security.enums.RoleName;
import integrativeproject.digitalbooking.security.jwt.JwtProvider;
import integrativeproject.digitalbooking.model.dto.Message;
import integrativeproject.digitalbooking.model.entity.security.Role;
import integrativeproject.digitalbooking.model.entity.security.User;
import integrativeproject.digitalbooking.service.impl.security.RoleService;
import integrativeproject.digitalbooking.service.impl.security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Set;


@RestController
@RequestMapping("/authenticate")
@CrossOrigin
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    RoleService rolService;

    @Autowired
    JwtProvider jwtProvider;

    //Espera un json y lo convierte a tipo clase NuevoUsuario
    @PostMapping("/newUser")
    public ResponseEntity<?> newUser(@Valid @RequestBody NewUser newUser, BindingResult bindingResult) throws MessagingException, UnsupportedEncodingException {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(new Message("Campos o email invalido"), HttpStatus.BAD_REQUEST);
        }
        if (userService.existsByUser(newUser.getUsername())) {
            return new ResponseEntity<>(new Message("Ese nombre de usuario ya existe"), HttpStatus.BAD_REQUEST);
        }
        if (userService.existsByEmail(newUser.getEmail())) {
            return new ResponseEntity<>(new Message("Ese email ya existe"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(newUser.getName(), newUser.getUsername(),
                newUser.getEmail(), passwordEncoder.encode(newUser.getPassword()), newUser.getCity());

        Set<Role> roles = new HashSet<>();
        roles.add(rolService.getByRoleName(RoleName.USER).get());
        if (newUser.getRoles().contains("ADMIN"))
            roles.add(rolService.getByRoleName(RoleName.ADMIN).get());
        user.setRoles(roles);

        userService.save(user, "http://g9-s3-front-digitalbooking-anita.s3-website-us-west-2.amazonaws.com/login/");

        return new ResponseEntity<>(new Message("Usuario creado"), HttpStatus.CREATED);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @GetMapping("/verify/{code}")
    public String verifyUser(@PathVariable("code") String code) {
        if (userService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }


    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody UserLogin userLogin, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return new ResponseEntity(new Message("Campos invalidos"), HttpStatus.BAD_REQUEST);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLogin.getUsername(), userLogin.getPassword()));


        boolean enabled = userService.getByUser(userLogin.getUsername()).isEnabled();
        if (!enabled)
            return new ResponseEntity(new Message("Tu usuario no está habilitado, verifica tu cuenta"), HttpStatus.BAD_REQUEST);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String name = userService.getByUser(userLogin.getUsername()).getName();
        JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities(), name);
        return new ResponseEntity<>(jwtDto, HttpStatus.OK);
    }

}

