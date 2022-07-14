package integrativeproject.digitalbooking.repository;

import integrativeproject.digitalbooking.model.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRepository extends JpaRepository<Image, Integer> {
}
