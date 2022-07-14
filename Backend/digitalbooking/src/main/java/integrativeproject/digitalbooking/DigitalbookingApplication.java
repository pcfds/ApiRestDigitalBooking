package integrativeproject.digitalbooking;

import integrativeproject.digitalbooking.service.impl.BookingService;
import org.apache.log4j.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DigitalbookingApplication {


	public static void main(String[] args) {


		PropertyConfigurator.configure("log4j.properties");


		SpringApplication.run(DigitalbookingApplication.class, args);

	}

}
