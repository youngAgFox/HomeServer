package com.ag.homeserver.util;

import lombok.extern.java.Log;
import org.owasp.html.HtmlPolicyBuilder;
import org.owasp.html.PolicyFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Log
public class InputUtil {

    public static String sanitizeAllHtml(String input) {
        PolicyFactory policyFactory = new HtmlPolicyBuilder().toFactory();
        return policyFactory.sanitize(input);
    }

    public static Map<String, String> sanitizeAllHtml(Map<String, String> params, Set<String> expectedKeys) {
        HashMap<String, String> sanitized = new HashMap<>();
        for (Map.Entry<String, String> param : params.entrySet()) {
            if (expectedKeys.contains(param.getKey())) {
                sanitized.put(param.getKey(), sanitizeAllHtml(param.getValue()));
            } else {
                log.warning("Sanitizing out potentially malicious parameter. key: '"
                        + param.getKey() + "' value: '" + param.getValue() + "'");
            }
        }
        return sanitized;
    }

    public static void validateKeysNotNull(Set<String> expected, Map<String, String> actual) {
        for (String key : expected) {
            if (null == actual.get(key)) {
                throw new RuntimeException("Actual set did not contain the '" + key + "' key or the value was null");
            }
        }
    }
}
