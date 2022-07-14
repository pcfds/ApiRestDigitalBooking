package integrativeproject.digitalbooking.controller;


import integrativeproject.digitalbooking.service.impl.BookingService;
import integrativeproject.digitalbooking.model.dto.BookingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.Set;
@CrossOrigin
@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<?> bookingCreate(@RequestBody BookingDTO bookingDTO) throws MessagingException, UnsupportedEncodingException {
        bookingService.create(bookingDTO);

        return ResponseEntity.ok(HttpStatus.CREATED);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> bookingUpdate(@PathVariable ("id") Integer id, @RequestBody BookingDTO bookingDTO) {
        bookingService.update(bookingDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findBooking(){
        Set<BookingDTO> aDTO = bookingService.findAll();
        if (aDTO.size() > 0)
            return ResponseEntity.ok(aDTO);
        return ResponseEntity.badRequest().body("No verified Bookings");
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findBookingById(@PathVariable("id") Integer id) {
        BookingDTO aDTO = bookingService.findById(id);
        /*In case of verification required to booking*/
        /*if (aDTO.isEnabled())*/
            return ResponseEntity.ok(aDTO);
       /* return ResponseEntity.badRequest().body("Booking unverified");*/
    }
    @GetMapping("/findByProduct/{id}")
    public ResponseEntity<?> findBookingByProduct(@PathVariable("id") Integer id) {
        Set<BookingDTO> aDTO = bookingService.findBookingByProduct(id);
        if (aDTO.size() > 0)
            return ResponseEntity.ok(aDTO);
        return ResponseEntity.badRequest().body("No verified Bookings");

    }
    @GetMapping("/findByUser/{username}")
    public ResponseEntity<?> findByUser(@PathVariable("username")String username) {
        Set<BookingDTO> aDTO = bookingService.findBookingByUser(username);
        if (aDTO.size() > 0)
            return ResponseEntity.ok(aDTO);
        return ResponseEntity.badRequest().body("No verified Bookings");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> bookingDelete(@PathVariable("id") Integer id) {
        bookingService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /*In case of verification required to booking*/

    /*@GetMapping("/verify/{code}")
    public String verifyBooking(@PathVariable("code") String code) {
        if (bookingService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }*/

}





