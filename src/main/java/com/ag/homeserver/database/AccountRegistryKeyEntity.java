package com.ag.homeserver.database;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Entity(name="account_registry_keys")
public class AccountRegistryKeyEntity {
    @Id
    private String accountRegistryKeyCode;
    private String username;
    private Timestamp registerDtm;
    private boolean enabled;
}
