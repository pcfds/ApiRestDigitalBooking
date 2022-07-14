package integrativeproject.digitalbooking.model.dto;

import lombok.*;
import org.springframework.web.bind.annotation.RestController;


@Data
public class   Message {
    private String message;

    public Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
