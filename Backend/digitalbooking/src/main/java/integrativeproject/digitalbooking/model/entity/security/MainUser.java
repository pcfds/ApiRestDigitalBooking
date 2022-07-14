package integrativeproject.digitalbooking.model.entity.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MainUser implements UserDetails {


    private String name;
    private String username;
    private String email;
    private String password;
    private String city;

    private Collection<? extends GrantedAuthority> authorities;

    public MainUser(String name, String username, String email, String password, String city, Collection<? extends GrantedAuthority> authorities) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.city = city;
        this.authorities = authorities;
    }

    //Asignación de privilegios (autorización)
    public static MainUser build(User user){
        //Conversión de la clase Rol a la clase GrantedAuthority
        List<GrantedAuthority> authorities =
                user.getRoles()
                        .stream()
                        .map(rol -> new SimpleGrantedAuthority(rol.getRoleName().name()))
                        .collect(Collectors.toList());
        return new MainUser(user.getName(), user.getUsername(), user.getEmail(),
                user.getPassword(), user.getCity(), authorities);
    }



    //los que tengan la anotación @Override son métodos de UserDetails de SpringSecurity

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCity() {
        return city;
    }

}
