package backend.server.service.utils;

public class Utils {

    public static class Password {

        public static boolean validPassword(String password) {
            return password != null && password.length() >= 6;
        }

    }

}
