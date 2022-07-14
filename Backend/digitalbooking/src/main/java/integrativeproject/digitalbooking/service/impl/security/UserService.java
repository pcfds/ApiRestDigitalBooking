package integrativeproject.digitalbooking.service.impl.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import integrativeproject.digitalbooking.model.dto.ProductDTO;
import integrativeproject.digitalbooking.model.entity.Product;
import integrativeproject.digitalbooking.model.entity.security.Role;
import integrativeproject.digitalbooking.model.entity.security.User;
import integrativeproject.digitalbooking.repository.security.UserRepository;
import integrativeproject.digitalbooking.service.impl.ProductService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Set;

import static integrativeproject.digitalbooking.security.enums.RoleName.ADMIN;

@Service
@Transactional
public class UserService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductService productService;

    @Autowired
    ObjectMapper objectMapper;

    public User getByUser(String username){
        return userRepository.findByUsername(username);
    }

    public Boolean isAdmin(String username){
            Set<Role> roleSet = getByUser(username).getRoles();
            Boolean admin = false;
            for (Role role : roleSet)
                if (role.getRoleName() == ADMIN)
                    admin = true;
            return admin;
    }

    public Boolean existsByUser(String username){

        return userRepository.existsByUsername(username);
    }

    public Boolean existsByEmail(String email){

        return userRepository.existsByEmail(email);
    }

    public Set<ProductDTO> getLikedProducts (String username){

        Set<Product> setProducts = getByUser(username).getLikedProducts();

        Set<ProductDTO> productDTOSet = new HashSet<>();

        for (Product product : setProducts)
            productDTOSet.add(objectMapper.convertValue(product, ProductDTO.class));


        return productDTOSet;
    }

    public ResponseEntity<?> addLikedProduct (String username, String nameIdentifier){
        User user = getByUser(username);
        ProductDTO product = productService.findProductByName(nameIdentifier);
        if (product == null)
            return ResponseEntity.badRequest().body("Product not found");
        else {
            user.getLikedProducts().add(objectMapper.convertValue(product, Product.class));
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }
    }

    public void save(User user, String siteURL) throws UnsupportedEncodingException, MessagingException {

        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        user.setEnabled(false);

        userRepository.save(user);

        sendVerificationEmail(user, siteURL);
    }

    private void sendVerificationEmail(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "apidigitalbooking@gmail.com";
        String senderName = "Digital Booking";
        String subject = "¡Hola! Verifica tu cuenta";
        String content = "[[name]],<br>"
                + "Por favor, hace click en el siguiente link para verificar tu cuenta:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFICA TU CUENTA</a></h3>"
                + "Muchas gracias, te esperamos en nuestro sitio<br>"
                + "El equipo con más onda de Digital Booking";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName());
        String verifyURL = siteURL + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);

            return true;
        }
    }

    public ResponseEntity<?> deleteLikedProduct(String username, String nameIdentifier) {
        User user = getByUser(username);
        ProductDTO product = productService.findProductByName(nameIdentifier);

        if (product == null)
            return ResponseEntity.badRequest().body("Product not found");
        else {
            user.getLikedProducts().remove(objectMapper.convertValue(product, Product.class));
            userRepository.deleteLikedProduct(user.getId(), product.getId());
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }

    }
}