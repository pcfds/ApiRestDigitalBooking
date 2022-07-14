//package integrativeproject.digitalbooking.service.impl;
//
//import integrativeproject.digitalbooking.model.dto.CategoryDTO;
//
//import static org.junit.jupiter.api.Assertions.*;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestInstance;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import java.util.Set;
//
//
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
////se creará una nueva instancia de prueba una vez por clase de prueba.Link: https://junit.org/junit5/docs/5.0.1/api/org/junit/jupiter/api/TestInstance.Lifecycle.html
//
//@SpringBootTest
//public class CategoryServiceTest {
////    private CategoryDTO categoryDTO;
////    @Autowired
////    CategoryService categoryService;
////
////
////    @BeforeEach
////    public void forAllTests() {
////
////        categoryDTO = new CategoryDTO();
////        categoryDTO.setTitle("Title catServiceTest");
////        categoryDTO.setDescription("Description Test");
////        categoryDTO.setUrlImage("https://UrlImage Test");
////        categoryDTO.setId(155);
////        categoryService.create(categoryDTO);
////
////    }
////
////    @Test
////    void create() {
////        CategoryDTO categoryDTOTest = new CategoryDTO();
////        {
////            categoryDTOTest.setTitle("Title test create");
////            categoryDTOTest.setDescription("Description test create");
////            categoryDTOTest.setUrlImage("UrlImage test create");
////        }
////        assertNotNull(categoryService.create(categoryDTOTest));
////    }
////
////    @Test
////    void update() {
////        categoryDTO.setTitle("Title test update");
////        CategoryDTO updatedCategory = categoryService.update(categoryDTO);
////        assertEquals("Title test update", updatedCategory.getTitle());
////    }
////
////    @Test
////    void findAll() {
////        Set<CategoryDTO> categoryDTO_list = categoryService.findAll();
////        assertTrue(categoryDTO_list.size() > 0);
////    }
////
////    @Test
////    void findById() {
////
////        assertNotNull(categoryService.findById(categoryDTO.getId()));
////    }
////
////    @Test
////    void deleteById() {
////        Integer idRequired = categoryDTO.getId();
////        categoryService.deleteById(categoryDTO.getId());
////        assertNull(categoryService.findById(idRequired));
////    }
//
//}