package integrativeproject.digitalbooking.service;

import integrativeproject.digitalbooking.model.dto.BookingDTO;
import integrativeproject.digitalbooking.model.entity.Booking;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.sql.Date;
import java.util.Set;

public interface IBookingService extends ICrudService<BookingDTO>{

    BookingDTO create(BookingDTO bookingDTO) throws MessagingException, UnsupportedEncodingException;

    Set<BookingDTO> findBookingByProduct(Integer product_id);

    Set<BookingDTO> findBookingByUser(String username);
}
