Görev Yönetimi Uygulaması

Laravel ve React kullanılarak geliştirilmiş, kullanıcı dostu bir Görev Yönetimi modülü. Bu uygulama, görev oluşturma, düzenleme, silme, zamanlanmış görevler, gerçek zamanlı bildirimler ve Kanban panosu gibi özellikler sunar.

Özellikler:

*Görev Yönetimi*

Görev Oluşturma, Düzenleme ve Silme: Kullanıcılar yeni görevler oluşturabilir, mevcut görevleri düzenleyebilir ve gereksiz görevleri silebilir.
Zamanlanmış Görevler: Görevler belirli bir zamanda otomatik olarak başlatılabilir.
Kanban Panosu: Görevlerin durumlarını güncelleyebilir ve görsel olarak yönetebilirsiniz.

Gerçek Zamanlı Bildirimler
Anlık Bildirimler: Görev durumu değişikliklerinde ilgili kullanıcılara anlık bildirimler gönderilir.
Performans Optimizasyonları

Backend:
Veritabanı Sorgu Optimizasyonu: Veritabanı sorguları optimize edilmiştir.
Önbellekleme: Veriler önbelleğe alınarak erişim süresi azaltılmıştır.

Frontend:
Lazy Loading: React bileşenleri ihtiyaç duyulduğunda yüklenir, başlangıç yükleme süresi azaltılır.
Memoization: React.memo ve useMemo kullanılarak gereksiz yeniden render işlemleri önlenir.

API Entegrasyonu
RESTful API Endpoint'leri: Uygulama, RESTful API üzerinden veri alışverişi yapar.
Swagger ile API Dokümantasyonu: API'lerin detaylı dokümantasyonu Swagger kullanılarak sağlanır.


Kurulum ve Yapılandırma:

Pusher Ayarlarını Yapılandırma
Pusher hesabınızdan App ID, App Key, App Secret ve Cluster bilgilerini alın.
Bu bilgileri .env dosyanıza ekleyin

*Queue Worker'ı Başlatmayı unutmayın.

Bildirim Türleri:

TaskStatusChanged Bildirimi
-Görevlerin durumları değiştiğinde ilgili kullanıcılara gönderilir.

TaskStarted Bildirimi
-Zamanlanmış görevler başlatıldığında kullanıcılara gönderilir.

Performans Optimizasyonları:

Backend Optimizasyonları
Caching: Görev listesi Cache::remember ile önbelleğe alınır.
Eager Loading: Task::with('user') kullanılarak N+1 sorgu problemi önlenir.

Frontend Optimizasyonları
Lazy Loading: React bileşenleri lazy load edilerek başlangıç yükleme süresi azaltılır.
Memoization: React.memo ve useMemo kullanılarak gereksiz yeniden render işlemleri önlenir.

Ek Bilgiler
Laravel Broadcasting ve Pusher
Laravel'ın broadcasting özelliği ile Pusher kullanarak gerçek zamanlı bildirimler sağlanır. Pusher hesabınızdan alınan App ID, App Key, App Secret ve Cluster bilgilerini .env dosyanıza eklemeniz gerekmektedir.

API Authentication
API'ler auth:sanctum middleware ile korunmaktadır. Kullanıcıların API'lere erişebilmesi için token tabanlı kimlik doğrulaması gereklidir. Kullanıcı oturumu açtıktan sonra, auth_token yerel depolamada (localStorage) saklanarak API isteklerinde kullanılır.

Frontend ve Backend Entegrasyonu
Frontend ve backend aynı proje içerisinde çalışacak şekilde yapılandırılmıştır. React uygulaması resources/frontend dizininde bulunurken, Laravel backend kök dizininde yer almaktadır. Proxy ayarı sayesinde, React uygulaması API isteklerini Laravel backend üzerinden yapabilir.

Environment Variables
Backend (.env): Laravel ile ilgili tüm çevresel değişkenler burada tanımlanır.
Frontend (resources/frontend/.env): React uygulaması için gerekli Pusher bilgileri burada tanımlanır.
Deployment
Uygulamayı dağıtırken, hem Laravel hem de React uygulamalarını uygun sunuculara yerleştirmeniz gerekmektedir. Üretim ortamında, React build dosyalarını Laravel'ın public dizinine veya ayrı bir CDN'ye dağıtabilirsiniz.

Güvenlik
Çevresel Değişkenler: .env dosyasını asla kaynak kontrolüne eklemeyin.
API Güvenliği: API endpoint'lerini korumak için auth:sanctum middleware kullanılmıştır.
Queue Güvenliği: Queue job'larının güvenli bir şekilde işlendiğinden emin olun.

MA.