package integrativeproject.digitalbooking.controller;

import integrativeproject.digitalbooking.service.impl.CategoryService;
import integrativeproject.digitalbooking.model.dto.CategoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
@CrossOrigin
@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<?> categoriesRegister(@RequestBody CategoryDTO categoryDTO){
        categoryService.create(categoryDTO);

        return ResponseEntity.ok(HttpStatus.CREATED);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> categoriesUpdate(@PathVariable ("id") Integer id,@RequestBody CategoryDTO categoryDTO) {
        categoryService.update(categoryDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<CategoryDTO>> findCategories(){

        return ResponseEntity.ok(categoryService.findAll());

    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findCategoriesById(@PathVariable("id") Integer id) {
        CategoryDTO aDTO = categoryService.findById(id);
        return ResponseEntity.ok(aDTO);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> categoriesDelete(@PathVariable("id") Integer id) {
        categoryService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}





