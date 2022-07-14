package integrativeproject.digitalbooking.service;

import integrativeproject.digitalbooking.model.dto.ProductDTO;


import java.sql.Date;
import java.util.Set;


public interface IProductService extends ICrudService<ProductDTO> {
    Set<ProductDTO> findProductByCategory(String category);
    Set<ProductDTO> findProductByCity(String city);
    Set<ProductDTO> findProductByCity2(String city, String province, String country);

    Set<ProductDTO> findProductByCityAndDate(String city, Date startDate, Date endDate);

    Set<ProductDTO> findProductByDate (Date startDate, Date endDate);


}
