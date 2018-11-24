OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '1026007430931-vn68iuljvc4eke84uqjerv57eoprpmo4.apps.googleusercontent.com', '2fSi9vtpPTS5F3Uq_6ckAhrQ', { :skip_jwt => true, client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end