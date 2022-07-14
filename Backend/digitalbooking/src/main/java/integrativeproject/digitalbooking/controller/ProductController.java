package integrativeproject.digitalbooking.controller;

import integrativeproject.digitalbooking.service.impl.ProductService;
import integrativeproject.digitalbooking.model.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/products")

public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<?> productRegister(@RequestBody ProductDTO productDTO) {
        productService.create(productDTO);

        return ResponseEntity.ok(HttpStatus.CREATED);

    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<ProductDTO>> findProducts() {

        return ResponseEntity.ok(productService.findAll());

    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findProductById(@PathVariable("id") Integer id) {
        ProductDTO aDTO = productService.findById(id);

        return ResponseEntity.ok(aDTO);

    }

    @GetMapping("findByCity/{city}")
    public ResponseEntity<?> findProductByCity(@PathVariable("city") String city) {
        Set<ProductDTO> productDTOSet = productService.findProductByCity(city);

        return ResponseEntity.ok(productDTOSet);
    }

    @GetMapping("findByCity/{city}/{province}/{country}")
    public ResponseEntity<?> findProductByCity2(@PathVariable("city") String city, @PathVariable("province") String province,
                                                @PathVariable("country") String country) {
        Set<ProductDTO> productDTOSet = productService.findProductByCity2(city, province, country);

        return ResponseEntity.ok(productDTOSet);
    }

    @GetMapping("findByCategory/{category}")
    public ResponseEntity<?> findProductByCategory(@PathVariable("category") String category) {
        Set<ProductDTO> productDTOSet = productService.findProductByCategory(category);

        return ResponseEntity.ok(productDTOSet);
    }

    @GetMapping("findProductByName/{nameIdentifier}")
    public ResponseEntity<?> findProductByName(@PathVariable("nameIdentifier") String nameIdentifier) {

            ProductDTO productDTO = productService.findProductByName(nameIdentifier);
            return ResponseEntity.ok(productDTO);
        }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable("id") Integer id) {
        productService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Integer id, @RequestBody ProductDTO productDTO) {
        productService.update(productDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @GetMapping("/findByCityAndDate/{city}/{startDate}/{endDate}")
    public ResponseEntity<?>findProductByCityAndDate (@PathVariable("city") String city, @PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate){
        Set<ProductDTO> productDTOSet = productService.findProductByCityAndDate(city, startDate, endDate);
        return ResponseEntity.ok(productDTOSet);
    }

    @GetMapping("/findByDate/{startDate}/{endDate}")
    public ResponseEntity<?>findProductByDate (@PathVariable("startDate") Date startDate, @PathVariable("endDate") Date endDate){
        Set<ProductDTO> productDTOSet = productService.findProductByDate(startDate, endDate);
        return ResponseEntity.ok(productDTOSet);
    }

}
