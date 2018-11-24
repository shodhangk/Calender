OmniAuth.config.logger = Rails.logger
google_tokens = YAML.load_file("#{Rails.root}/config/google_token.yml")
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, google_tokens["google"]["app_id"] , google_tokens["google"]["secret_key"], { :skip_jwt => true, client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end