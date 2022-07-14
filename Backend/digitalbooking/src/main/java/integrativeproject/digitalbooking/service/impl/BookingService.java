package integrativeproject.digitalbooking.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import integrativeproject.digitalbooking.model.dto.BookingDTO;
import integrativeproject.digitalbooking.model.dto.ProductDTO;
import integrativeproject.digitalbooking.model.entity.Booking;
import integrativeproject.digitalbooking.model.entity.Product;
import integrativeproject.digitalbooking.repository.IBookingRepository;
import integrativeproject.digitalbooking.model.entity.security.User;
import integrativeproject.digitalbooking.service.impl.security.UserService;
import integrativeproject.digitalbooking.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @Autowired
    private IBookingRepository bookingRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public BookingDTO findById(Integer id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        BookingDTO bookingDTO = null;
        if (booking.isPresent())
            /*if (booking.get().isEnabled())*/ /*In case of verification required to booking*/
            bookingDTO = objectMapper.convertValue(booking, BookingDTO.class);
        return bookingDTO;
    }

    @Override
    public BookingDTO create(BookingDTO bookingDTO) throws MessagingException, UnsupportedEncodingException {
        User user = userService.getByUser(bookingDTO.getUser().getUsername());
        ProductDTO product = productService.findById(bookingDTO.getProduct().getId());
        Booking booking = objectMapper.convertValue(bookingDTO, Booking.class);
        booking.setUser(user);
        booking.setProduct(objectMapper.convertValue(product, Product.class));
        bookingRepository.save(booking);
        sendVerificationEmail(user, booking);
        return bookingDTO;


    }

    @Override
    public void deleteById(Integer id) {
        bookingRepository.deleteById(id);

    }

    @Override
    public BookingDTO update(BookingDTO bookingDTO) {
        Booking booking = objectMapper.convertValue(bookingDTO, Booking.class);
        bookingRepository.save(booking);
        return bookingDTO;
    }

    @Override
    public Set<BookingDTO> findAll() {
        List<Booking> bookingS = bookingRepository.findAll();
        Set<BookingDTO> bookingSDTO = new HashSet<>();
        for (Booking booking : bookingS) {
            /*if (booking.isEnabled()) *//*In case of verification required to booking*/
            bookingSDTO.add(objectMapper.convertValue(booking, BookingDTO.class));
        }
        return bookingSDTO;

    }

    @Override
    public Set<BookingDTO> findBookingByProduct(Integer product_id) {
        Set<Booking> bookingSet = bookingRepository.findBookingByProduct(product_id);
        Set<BookingDTO> bookingDTOSet = new HashSet<>();
        if (bookingSet.size() > 0) {
            for (BookingDTO bookingDTO : bookingDTOSet)
               /* if (bookingDTO.isEnabled())*/ /*In case of verification required to booking*/
                    bookingDTOSet.add(objectMapper.convertValue(bookingDTO, BookingDTO.class));
        }
        return bookingDTOSet;
    }

    @Override
    public Set<BookingDTO> findBookingByUser(String username) {
        User user = userService.getByUser(username);
        Set<Booking> bookingSet = bookingRepository.findBookingByUser(user);
        Set<BookingDTO> bookingDTOSet = new HashSet<>();
        if (bookingSet.size() > 0) {
              for (Booking booking : bookingSet) {
                  /*if (booking.isEnabled())*/ /*In case of verification required to booking*/
                    bookingDTOSet.add(objectMapper.convertValue(booking , BookingDTO.class));
                }
          }

        return bookingDTOSet;
    }
    private void sendVerificationEmail(User user, Booking booking)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "apidigitalbooking@gmail.com";
        String senderName = "Digital Booking";
        String subject = "Agendamos tu reserva con exito!";
        String content = "[[name]],<br>"
                + "Tu reserva ha sido agendada con éxito en digital booking.<br>"
                + "A continuación te brindamos los datos de la misma para que puedas verificarlos: <br>"
                + "Hotel: [[hotel]] <br>"
                + "Ciudad: [[city]]<br>"
                + "Check In: [[startDate]], [[time]] horas <br>"
                + "Check Out: [[endDate]], [[time1]] horas<br>"
                + "<h3>Podés ver la descripción completa del producto haciendo click <a href=\"[[URL]]\" target=\"_self\">acá</a></h3>"
                + "Muchas gracias, te esperamos en nuestro sitio<br>"
                + "El equipo con más onda de Digital Booking";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName());
        content = content.replace("[[hotel]]", booking.getProduct().getName());
        content = content.replace("[[city]]", booking.getProduct().getCity().getName());
        content = content.replace("[[startDate]]", booking.getBookingStartDate().toString());
        content = content.replace("[[time]]", booking.getTime().toString());
        content = content.replace("[[endDate]]", booking.getBookingEndDate().toString());
        content = content.replace("[[time1]]", booking.getProduct().getCheckOut().toString());
        content = content.replace("[[URL]]", "http://g9-s3-front-digitalbooking-anita.s3-website-us-west-2.amazonaws.com/products/"+booking.getProduct().getNameIdentifier());

        helper.setText(content, true);

        mailSender.send(message);
    }

    /*In case of verification required to booking*/
 /*   public boolean verify(String verificationCode) {
        Booking booking = bookingRepository.findByVerificationCode(verificationCode);

        if (booking == null || booking.isEnabled()) {
            return false;
        } else {
            booking.setVerificationCode(null);
            booking.setEnabled(true);
            bookingRepository.save(booking);

            return true;
        }
    }*/
}



