package integrativeproject.digitalbooking.controller;

import integrativeproject.digitalbooking.model.dto.ProductDTO;
import integrativeproject.digitalbooking.model.entity.Product;
import integrativeproject.digitalbooking.model.entity.security.User;
import integrativeproject.digitalbooking.service.impl.security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin

public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/isAdmin/{username}")
    public ResponseEntity<?> isAdmin(@PathVariable("username") String username){
        if(userService.isAdmin(username))
            return ResponseEntity.ok(HttpStatus.ACCEPTED);
        else
            return ResponseEntity.ok(HttpStatus.FORBIDDEN);
    }

    @GetMapping("/favorites/{username}")
    public ResponseEntity<Set<ProductDTO>> getLikedProducts(@PathVariable("username") String username) {
        return ResponseEntity.ok(userService.getLikedProducts(username));
    }
    @PostMapping("/favorites/{username}/{nameIdentifier}")
    public ResponseEntity<?> addLikedProduct(@PathVariable("username") String username, @PathVariable("nameIdentifier") String nameIdentifier) {
        return userService.addLikedProduct(username, nameIdentifier);
    }

    @DeleteMapping("/favorites/{username}/{nameIdentifier}")
    public ResponseEntity<?> deleteLikedProduct(@PathVariable("username") String username, @PathVariable("nameIdentifier") String nameIdentifier) {
        return userService.deleteLikedProduct(username, nameIdentifier);
    }


}
