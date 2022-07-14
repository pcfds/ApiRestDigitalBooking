package integrativeproject.digitalbooking.controller;

import integrativeproject.digitalbooking.service.impl.ImageService;
import integrativeproject.digitalbooking.model.dto.ImageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
@CrossOrigin
@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    ImageService imageService;


    @PostMapping("/create")
    public ResponseEntity<?> imageRegister(@RequestBody ImageDTO imageDTO){
        imageService.create(imageDTO);

        return ResponseEntity.ok(HttpStatus.CREATED);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> imageUpdate(@PathVariable ("id") Integer id ,@RequestBody ImageDTO imageDTO) {
        imageService.update(imageDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<ImageDTO>> findImage(){

        return ResponseEntity.ok(imageService.findAll());

    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findImageById(@PathVariable("id") Integer id) {
        ImageDTO aDTO = imageService.findById(id);
        return ResponseEntity.ok(aDTO);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> imageDelete(@PathVariable("id") Integer id) {
        imageService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
