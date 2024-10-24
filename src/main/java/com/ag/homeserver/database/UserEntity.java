package com.ag.homeserver.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Users")
public class UserEntity {
    @Id
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String nickName;
    private String email;
    private Timestamp createDtm;
    private Timestamp updateDtm;
    private boolean enabled;
    @OneToMany(mappedBy="username")
    private Collection<AuthorityEntity> authorities;
}
