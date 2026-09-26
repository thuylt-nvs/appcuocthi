// Ngân hàng câu hỏi tự động trích xuất từ tài liệu kỹ năng tiểu học
const QUESTIONS_DB = [
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_1",
    "number": 1,
    "question": "Tại sao chúng ta nên ăn rau củ quả có nhiều màu sắc khác nhau (đỏ, vàng, xanh, tím...)?",
    "options": {
      "A": "Để đĩa thức ăn trông đẹp mắt và chụp ảnh đẹp hơn.",
      "B": "Vì mỗi màu sắc của thực phẩm cung cấp các loại vitamin và dưỡng chất khác nhau cho cơ thể.",
      "C": "Vì các loại rau quả cùng màu thì ăn sẽ rất chán.",
      "D": "Ăn nhiều màu sắc để răng của chúng ta chuyển thành màu đó."
    },
    "answer": "B",
    "explanation": "Mỗi nhóm màu sắc của rau củ quả (ví dụ màu đỏ bổ mắt/tim mạch, màu xanh lá bổ sung chất xơ và vitamin C, màu cam tốt cho hệ miễn dịch...) đại diện cho các dưỡng chất khác nhau cần thiết cho sự phát triển của cơ thể.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_2",
    "number": 2,
    "question": "Một bữa ăn đủ chất dinh dưỡng của học sinh tiểu học cần có đủ những nhóm chất nào?",
    "options": {
      "A": "Chỉ cần thật nhiều thịt và xúc xích.",
      "B": "Chỉ cần cơm và nước canh.",
      "C": "Tinh bột, chất đạm, chất béo, vitamin và khoáng chất.",
      "D": "Kẹo ngọt, bánh sữa và nước ngọt có ga."
    },
    "answer": "C",
    "explanation": "Bữa ăn cân bằng cần có 4 nhóm chất chính: Nhóm bột đường (cơm, bánh mì), nhóm chất đạm (thịt, cá, trứng), nhóm chất béo (dầu ăn, mỡ), và nhóm vitamin/khoáng chất (rau củ, trái cây).",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_3",
    "number": 3,
    "question": "Khi cảm thấy khát nước trong lúc đang vui chơi ở trường, em nên làm gì?",
    "options": {
      "A": "Nhịn uống nước đợi đến lúc về nhà uống một thể.",
      "B": "Uống một hơi thật nhanh 3 cốc nước lạnh lớn.",
      "C": "Uống nước từ từ từng ngụm nhỏ, sử dụng bình nước cá nhân hoặc vòi nước sạch của trường.",
      "D": "Mua nước ngọt có ga hoặc trà sữa để uống cho đã khát."
    },
    "answer": "C",
    "explanation": "Uống nước từng ngụm nhỏ giúp cơ thể hấp thụ tốt nhất. Nước lọc là tốt nhất cho sức khỏe, tránh uống quá nhanh hoặc lạm dụng nước ngọt có ga.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_4",
    "number": 4,
    "question": "Tư thế ngồi học nào sau đây là đúng để bảo vệ mắt và cột sống?",
    "options": {
      "A": "Nằm bò ra bàn học, mắt ghé sát vào trang vở.",
      "B": "Lưng thẳng, ngực không tì vào bàn, mắt cách sách vở khoảng 25-30 cm.",
      "C": "Ngồi vẹo sang một bên để viết cho nhanh.",
      "D": "Đeo kính râm khi ngồi học bài trong phòng tối."
    },
    "answer": "B",
    "explanation": "Tư thế ngồi thẳng lưng, khoảng cách từ mắt đến vở từ 25-30 cm giúp phòng ngừa cận thị và cong vẹo cột sống.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_5",
    "number": 5,
    "question": "Sau khi sử dụng máy tính hoặc xem tivi khoảng 20-30 phút, em nên làm gì để bảo vệ mắt?",
    "options": {
      "A": "Tiếp tục chơi game trên điện thoại để thay đổi không khí.",
      "B": "Nhìn ra xa ngoài cửa sổ (khoảng 6 mét) vào các tán cây xanh khoảng 20 giây và chớp mắt nhẹ nhàng.",
      "C": "Nhắm mắt lại và dùng tay dụi thật mạnh vào mắt.",
      "D": "Nhỏ thật nhiều thuốc nhỏ mắt mà không hỏi ý kiến bố mẹ."
    },
    "answer": "B",
    "explanation": "Đây là quy tắc 20-20-20 (sau mỗi 20 phút nhìn màn hình, hãy nhìn ra xa 20 feet/6 mét trong 20 giây) giúp mắt giảm mệt mỏi và điều tiết tốt hơn.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_6",
    "number": 6,
    "question": "Để chuẩn bị cho một giấc ngủ ngon vào buổi tối, thói quen nào sau đây là TỐT NHẤT?",
    "options": {
      "A": "Xem các bộ phim kinh dị hoặc chơi trò chơi điện tử ngay trước khi ngủ.",
      "B": "Ăn thật no và uống nhiều nước ngọt sát giờ đi ngủ.",
      "C": "Vệ sinh cá nhân sạch sẽ, đọc một cuốn sách giấy nhẹ nhàng và tắt hết các thiết bị điện tử trước khi ngủ 30-60 phút.",
      "D": "Bật đèn thật sáng và mở nhạc âm lượng lớn suốt đêm."
    },
    "answer": "C",
    "explanation": "Tránh ánh sáng xanh từ màn hình điện tử và các hoạt động kích thích mạnh trước khi ngủ giúp não bộ dễ đi vào giấc ngủ sâu và ngon hơn.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_7",
    "number": 7,
    "question": "Hành vi nào giúp phát triển chiều cao tối ưu ở lứa tuổi tiểu học?",
    "options": {
      "A": "Lười vận động, chỉ nằm xem điện thoại và thức khuya sau 11 giờ đêm.",
      "B": "Tích cực tập thể thao (bơi lội, nhảy dây, bóng rổ), ăn đủ chất đạm/canxi và ngủ trước 10 giờ tối.",
      "C": "Ăn thật nhiều đồ ăn nhanh, uống nhiều trà sữa mỗi ngày.",
      "D": "Đi giày có đế thật cao để đánh lừa chiều cao."
    },
    "answer": "B",
    "explanation": "Chiều cao phát triển tốt nhất nhờ sự kết hợp của vận động thể thao, chế độ dinh dưỡng giàu canxi/vitamin D và ngủ sớm (hormone tăng trưởng tiết ra nhiều nhất vào ban đêm khoảng từ 10h tối đến 2h sáng khi ngủ sâu).",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_8",
    "number": 8,
    "question": "Buổi sáng thức dậy, em cảm thấy mệt mỏi và không muốn ăn sáng. Lựa chọn nào sau đây là phù hợp nhất?",
    "options": {
      "A": "Bỏ bữa sáng hoàn toàn để đi học luôn.",
      "B": "Ăn một gói kẹo thật ngọt để lấy năng lượng nhanh.",
      "C": "Ăn nhẹ một bát cháo nóng hoặc một lát bánh mì kẹp trứng và uống một chút nước ấm.",
      "D": "Nhờ bố mẹ xin nghỉ học ở nhà để ngủ tiếp."
    },
    "answer": "C",
    "explanation": "Bữa sáng cung cấp năng lượng cho cả ngày học tập. Nếu mệt mỏi, nên chọn các món ăn nhẹ, dễ tiêu hóa thay vì bỏ bữa hoặc ăn đồ quá ngọt.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_9",
    "number": 9,
    "question": "Khi đi mua đồ ăn vặt ở cổng trường, điều gì em cần lưu ý nhất trên nhãn mác sản phẩm?",
    "options": {
      "A": "Màu sắc của vỏ bao bì xem có sặc sỡ không.",
      "B": "Hình ảnh các nhân vật hoạt hình in trên sản phẩm.",
      "C": "Tên thương hiệu xem có nổi tiếng trên Tiktok không.",
      "D": "Hạn sử dụng, nơi sản xuất và bảng thành phần dinh dưỡng."
    },
    "answer": "D",
    "explanation": "Đọc hạn sử dụng và nguồn gốc giúp tránh ngộ độc thực phẩm; bảng thành phần giúp lựa chọn đồ ăn lành mạnh, ít đường và chất bảo quản độc hại.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_10",
    "number": 10,
    "question": "Tại sao cơ thể chúng ta cần uống đủ nước mỗi ngày?",
    "options": {
      "A": "Để bụng to ra và đỡ đói bụng hơn.",
      "B": "Giúp vận chuyển chất dinh dưỡng, thải lọc chất độc ra khỏi cơ thể và điều hòa nhiệt độ.",
      "C": "Để chúng ta không cần phải đi vệ sinh nữa.",
      "D": "Nước uống vào sẽ giúp răng trắng bóng tự nhiên."
    },
    "answer": "B",
    "explanation": "Nước chiếm hơn 70% cơ thể, đóng vai trò sống còn trong việc tiêu hóa, tuần hoàn và thanh lọc độc tố qua mồ hôi và nước tiểu.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_11",
    "number": 11,
    "question": "Em đang xem tivi và nhận ra phòng khách rất tối, chỉ có ánh sáng từ màn hình tivi phát ra. Em nên làm gì?",
    "options": {
      "A": "Tắt tivi đi đi ngủ ngay lập tức dù chưa đến giờ.",
      "B": "Bật thêm đèn chiếu sáng trong phòng để mắt không phải điều tiết quá mức do chênh lệch ánh sáng.",
      "C": "Tiến sát lại gần màn hình tivi hơn để nhìn cho rõ.",
      "D": "Lấy một chiếc kính râm đeo vào để cản bớt ánh sáng tivi."
    },
    "answer": "B",
    "explanation": "Xem tivi trong phòng tối gây mỏi mắt, nhức đầu và dễ làm suy giảm thị lực do mắt phải tập trung vào nguồn sáng mạnh duy nhất.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_12",
    "number": 12,
    "question": "Khi chơi thể thao dưới trời nắng gắt ở sân trường, cách bảo vệ mắt nào sau đây là đúng?",
    "options": {
      "A": "Nhìn thẳng vào mặt trời để thử thách lòng dũng cảm.",
      "B": "Đeo mũ lưỡi trai rộng vành và tránh nhìn trực tiếp lên bầu trời nắng.",
      "C": "Nhắm mắt lại và chạy nhảy để tránh tia cực tím.",
      "D": "Lấy tay che mắt liên tục trong khi chơi."
    },
    "answer": "B",
    "explanation": "Mũ rộng vành che bớt ánh nắng trực tiếp chiếu vào mắt, bảo vệ võng mạc khỏi tia UV có hại.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_13",
    "number": 13,
    "question": "Em cùng gia đình đi ăn buffet tại nhà hàng. Lựa chọn lấy thức ăn nào thể hiện sự hiểu biết về dinh dưỡng?",
    "options": {
      "A": "Lấy thật đầy đĩa chỉ toàn đùi gà rán và khoai tây chiên vì đây là những món em thích nhất.",
      "B": "Lấy một lượng vừa đủ bao gồm: một ít cơm/mì, một phần thịt/cá, và nhiều rau củ luộc hoặc salad.",
      "C": "Lấy tất cả các món ngọt như bánh ngọt, kem và thạch trước rồi mới ăn các món khác.",
      "D": "Lấy thật nhiều đồ ăn rồi bỏ thừa lại vì đã trả tiền trọn gói."
    },
    "answer": "B",
    "explanation": "Ăn uống lành mạnh đòi hỏi sự cân bằng giữa các nhóm chất và tránh lãng phí đồ ăn.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_14",
    "number": 14,
    "question": "Trước khi đi ngủ, em rất muốn uống một cốc nước ngọt có ga lạnh. Hành vi nào là đúng?",
    "options": {
      "A": "Uống ngay vì nước ngọt lạnh giúp ngủ ngon hơn.",
      "B": "Uống nước ngọt rồi đi ngủ luôn không cần đánh răng.",
      "C": "Không uống nước ngọt sát giờ ngủ vì lượng đường và caffeine gây khó ngủ và hại răng. Thay vào đó, uống vài ngụm nước ấm nếu thấy khát.",
      "D": "Trộn nước ngọt với sữa để uống cho tốt dạ dày."
    },
    "answer": "C",
    "explanation": "Các chất kích thích như caffeine và đường trong nước ngọt làm hệ thần kinh tỉnh táo, gây mất ngủ và dễ làm sâu răng nếu vệ sinh không sạch sau đó.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_15",
    "number": 15,
    "question": "Khi ngồi học bài, em thấy cổ của mình bị mỏi và đầu hơi hướng về phía trước. Em nên điều chỉnh thế nào?",
    "options": {
      "A": "Cố gắng cúi gập đầu sâu hơn để đỡ mỏi.",
      "B": "Đứng dậy, thực hiện vài động tác xoay cổ nhẹ nhàng, điều chỉnh lại độ cao của bàn ghế và ngồi thẳng lưng.",
      "C": "Tựa cằm lên bàn học và tiếp tục viết bài.",
      "D": "Nằm hẳn xuống đất để viết tiếp."
    },
    "answer": "B",
    "explanation": "Biểu hiện mỏi cổ chứng tỏ tư thế ngồi hoặc độ cao bàn ghế chưa phù hợp. Cần thư giãn ngắn và chỉnh lại tư thế ngồi chuẩn để tránh các bệnh cột sống.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_16",
    "number": 16,
    "question": "Thói quen ăn uống nào dưới đây có lợi nhất cho hệ tiêu hóa của em?",
    "options": {
      "A": "Vừa ăn vừa xem điện thoại hoặc chơi game.",
      "B": "Ăn thật nhanh, nuốt chửng thức ăn để kịp giờ chơi.",
      "C": "Nhai kỹ thức ăn, tập trung vào bữa ăn và không đùa nghịch khi ăn.",
      "D": "Ăn xong là chạy nhảy, tập thể dục mạnh ngay lập tức."
    },
    "answer": "C",
    "explanation": "Nhai kỹ giúp thức ăn được nghiền nhỏ và trộn đều dịch vị, giúp dạ dày làm việc nhẹ nhàng hơn, tránh các chứng đầy hơi, đau dạ dày.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_17",
    "number": 17,
    "question": "Uống nước thế nào là phù hợp nhất khi em đang học bài trong lớp?",
    "options": {
      "A": "Mang theo bình nước cá nhân, thỉnh thoảng uống 1-2 ngụm nhỏ để giữ ẩm cho họng và não bộ tỉnh táo.",
      "B": "Cứ mỗi 5 phút lại xin ra ngoài uống nước ở vòi công cộng.",
      "C": "Không uống giọt nước nào suốt buổi học để đỡ phải đi vệ sinh.",
      "D": "Chỉ uống nước khi cổ họng khô khát đến mức đau rát."
    },
    "answer": "A",
    "explanation": "Việc bổ sung nước đều đặn từng ngụm nhỏ giúp nước hấp thụ tốt nhất và duy trì sự tập trung trong suốt tiết học.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_18",
    "number": 18,
    "question": "Đâu là dấu hiệu cho thấy mắt của em đang bị mỏi và cần được nghỉ ngơi?",
    "options": {
      "A": "Mắt nhìn rõ mọi vật ở xa.",
      "B": "Mắt có cảm giác khô, cay rát, chảy nước mắt hoặc nhìn hình ảnh bị nhòe đi.",
      "C": "Tai nghe thấy tiếng ù ù.",
      "D": "Da tay bị khô và ngứa."
    },
    "answer": "B",
    "explanation": "Khô mắt, cay rát và nhìn nhòe là các triệu chứng điển hình của mắt hoạt động quá tải.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_19",
    "number": 19,
    "question": "Để giúp cơ thể thư giãn sâu và chìm vào giấc ngủ nhanh hơn, em nên thực hiện bài tập nào?",
    "options": {
      "A": "Tập chạy bền quanh phòng ngủ.",
      "B": "Nhẩm bảng cửu chương thật nhanh.",
      "C": "Hít thở sâu bằng bụng: hít vào chậm bằng mũi, thở ra nhẹ nhàng bằng miệng và thả lỏng các cơ.",
      "D": "Hát karaoke thật to."
    },
    "answer": "C",
    "explanation": "Hít thở sâu và chậm kích hoạt hệ thần kinh phó giao cảm, giúp nhịp tim chậm lại, giảm căng thẳng và dễ ngủ.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_20",
    "number": 20,
    "question": "Mẹ chuẩn bị một đĩa rau quả gồm có cà rốt (màu cam), súp lơ (màu xanh), cà chua (màu đỏ) và bắp cải tím. Em nên ăn thế nào?",
    "options": {
      "A": "Chỉ ăn cà rốt vì nó ngọt.",
      "B": "Bỏ qua súp lơ vì nó có màu xanh lá cây giống cỏ.",
      "C": "Ăn đầy đủ mỗi loại một ít để bổ sung vitamin và dưỡng chất đa dạng cho cơ thể.",
      "D": "Trộn tất cả với tương ớt thật cay mới ăn."
    },
    "answer": "C",
    "explanation": "Ăn đầy đủ các nhóm màu thực phẩm giúp cơ thể nhận được nguồn vitamin và chất xơ toàn diện, tăng cường miễn dịch.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG CHĂM SÓC SỨC KHỎE CÁ NHÂN (DINH DƯỠNG & SINH HOẠT)",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_21",
    "number": 21,
    "question": "Ngày mai lớp em đi dã ngoại một ngày tại trang trại sinh thái. Em nên tự chuẩn bị balo của mình như thế nào?",
    "options": {
      "A": "Mang theo toàn bộ đồ chơi, truyện tranh và máy chơi game cầm tay để chơi với bạn.",
      "B": "Đợi bố mẹ chuẩn bị giúp hết và chỉ việc xách đi.",
      "C": "Lên danh sách các đồ dùng thiết yếu (mũ, bình nước, khăn giấy, thuốc chống muỗi, một bộ quần áo dự phòng) và tự xếp gọn gàng vào balo.",
      "D": "Mang theo một chiếc vali kéo thật lớn để đựng được nhiều đồ trang điểm và quần áo đẹp."
    },
    "answer": "C",
    "explanation": "Nguyên tắc chuẩn bị đồ đi dã ngoại là gọn nhẹ, ưu tiên nhu cầu cơ bản phù hợp với hoạt động ngoài trời và tự mình sắp xếp.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_22",
    "number": 22,
    "question": "Khi sắp xếp quần áo vào vali đi du lịch cùng gia đình, mẹo nào giúp em tiết kiệm diện tích nhất?",
    "options": {
      "A": "Gấp quần áo thành các hình vuông lớn rồi chồng lên nhau.",
      "B": "Cuộn tròn quần áo chặt tay rồi xếp khít nhau dưới đáy vali.",
      "C": "Vứt lộn xộn tất cả quần áo vào vali rồi nhảy lên đóng nắp lại.",
      "D": "Dùng bàn là ủi phẳng rồi treo quần áo lên móc trước khi bỏ vào vali."
    },
    "answer": "B",
    "explanation": "Cuộn tròn quần áo (rolling method) giúp giảm nếp nhăn và tiết kiệm rất nhiều diện tích so với cách gấp truyền thống.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_23",
    "number": 23,
    "question": "Em chuẩn bị đi khám răng định kỳ tại phòng khám nha sĩ và cảm thấy lo lắng, sợ hãi. Cách xử lý nào sau đây là TỐT NHẤT?",
    "options": {
      "A": "Khóc lóc, ăn vạ và kiên quyết không chịu vào phòng khám.",
      "B": "Tự ý mua thuốc giảm đau uống trước ở nhà để răng không bị đau.",
      "C": "Hít thở sâu, chia sẻ nỗi sợ hãi với bố mẹ hoặc nha sĩ, và hiểu rằng nha sĩ đang giúp răng của em khỏe mạnh hơn.",
      "D": "Trốn vào nhà vệ sinh của phòng khám và khóa cửa lại."
    },
    "answer": "C",
    "explanation": "Chia sẻ cảm xúc giúp giải tỏa lo lắng. Nha sĩ khám răng định kỳ giúp ngăn ngừa sâu răng sớm mà không gây đau đớn.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_24",
    "number": 24,
    "question": "Khi bước vào độ tuổi dậy thì, da mặt bắt đầu tiết nhiều dầu và dễ nổi mụn. Cách rửa mặt nào sau đây là đúng?",
    "options": {
      "A": "Dùng xà phòng giặt đồ chà thật mạnh lên mặt để tẩy sạch dầu thừa.",
      "B": "Rửa mặt bằng sữa rửa mặt dịu nhẹ phù hợp lứa tuổi ngày 2 lần (sáng và tối), massage nhẹ nhàng bằng tay sạch và rửa lại bằng nước sạch.",
      "C": "Dùng móng tay cào gãi thật mạnh vào các nốt mụn khi rửa mặt.",
      "D": "Không bao giờ rửa mặt bằng nước vì sợ làm mụn lan rộng hơn."
    },
    "answer": "B",
    "explanation": "Rửa mặt nhẹ nhàng giúp làm sạch bã nhờn, thông thoáng lỗ chân lông mà không gây tổn thương hay kích ứng da mặt nhạy cảm tuổi dậy thì.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_25",
    "number": 25,
    "question": "Trong giai đoạn dậy thì, cơ thể phát triển rất nhanh về chiều cao và cân nặng. Em cần lưu ý điều gì về dinh dưỡng?",
    "options": {
      "A": "Nhịn ăn hoàn toàn để giữ dáng thật gầy giống các người mẫu trên mạng.",
      "B": "Ăn thật nhiều đồ ngọt và đồ chiên rán để có nhiều mỡ dự trữ.",
      "C": "Ăn đủ bữa, cân đối dưỡng chất, chú trọng bổ sung canxi (sữa, tôm, cá), sắt (thịt đỏ, rau chân vịt) và vitamin.",
      "D": "Chỉ uống nước lọc và ăn rau xanh, không ăn thịt cá."
    },
    "answer": "C",
    "explanation": "Dậy thì là giai đoạn cơ thể cần năng lượng và dưỡng chất cao nhất để hoàn thiện các hệ cơ quan và phát triển khung xương.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_26",
    "number": 26,
    "question": "Bước vào tuổi dậy thì, em nhận ra tâm trạng của mình đôi khi thay đổi thất thường (dễ giận dỗi, nhạy cảm hoặc lo âu vô cớ). Em nên làm gì?",
    "options": {
      "A": "Đóng chặt cửa phòng, không nói chuyện và xa lánh tất cả mọi người trong gia đình.",
      "B": "Hiểu rằng đây là sự thay đổi sinh lý bình thường, chủ động tâm sự với bố mẹ, thầy cô hoặc viết nhật ký để giải tỏa cảm xúc.",
      "C": "Trút giận lên đồ chơi hoặc bắt nạt các em nhỏ hơn để xả stress.",
      "D": "Tự ý tìm mua thuốc điều chỉnh tâm trạng trên mạng về uống."
    },
    "answer": "B",
    "explanation": "Sự thay đổi hormone ở tuổi dậy thì tác động mạnh lên tâm lý. Hiểu và chia sẻ giúp các em vượt qua giai đoạn này một cách an toàn.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_27",
    "number": 27,
    "question": "Để giữ cơ thể luôn thơm tho và sạch sẽ trong những ngày hè oi bức ở tuổi dậy thì, thói quen nào là đúng?",
    "options": {
      "A": "Xịt thật nhiều nước hoa đè lên mùi mồ hôi mà không cần tắm.",
      "B": "Tắm rửa hàng ngày bằng xà bông tắm, chú ý lau khô các vùng nách, bẹn; thay quần áo lót sạch sẽ mỗi ngày và có thể dùng lăn khử mùi dịu nhẹ.",
      "C": "Mặc một bộ quần áo suốt 3 ngày liên tục để tiết kiệm bột giặt cho bố mẹ.",
      "D": "Hạn chế uống nước để cơ thể đỡ tiết ra mồ hôi."
    },
    "answer": "B",
    "explanation": "Tuyến mồ hôi và tuyến bã nhờn hoạt động mạnh ở tuổi dậy thì dễ gây mùi cơ thể. Vệ sinh sạch sẽ và thay quần áo lót hàng ngày là biện pháp cốt lõi.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_28",
    "number": 28,
    "question": "Trong lớp học, một bạn nam nói rằng: \"Việc dọn dẹp lớp học và rửa cốc chén là việc của các bạn nữ, con trai chỉ làm việc nặng thôi\". Quan điểm của em thế nào?",
    "options": {
      "A": "Bạn nam nói rất đúng, con gái phải làm hết việc nhà và việc dọn dẹp.",
      "B": "Cả nam và nữ đều có năng lực và trách nhiệm như nhau trong việc giữ gìn vệ sinh chung; công việc không phân biệt giới tính.",
      "C": "Con trai không nên làm bất cứ việc gì ở lớp để giữ hình ảnh.",
      "D": "Con gái nên dọn dẹp để đổi lại việc con trai bảo vệ khi có đánh nhau."
    },
    "answer": "B",
    "explanation": "Đây là khái niệm bình đẳng giới và xóa bỏ định kiến giới. Mọi công việc tự phục vụ và dọn dẹp chung cần được chia sẻ công bằng.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_29",
    "number": 29,
    "question": "Khi em rủ bạn cùng sắp xếp đồ dùng dã ngoại, bạn bảo: \"Tớ chả biết làm gì cả, cứ để bố mẹ làm cho nhanh\". Em nên thuyết phục bạn thế nào?",
    "options": {
      "A": "\"Ừ đúng đấy, để bố mẹ làm cho đỡ mệt, chúng mình đi chơi game đi\".",
      "B": "\"Cậu lười thế, không tự lập sau này không làm được việc gì đâu!\".",
      "C": "\"Tự chuẩn bị đồ thú vị lắm! Chúng mình cùng lên danh sách rồi xếp đồ nhé, tự chuẩn bị sẽ giúp mình biết món đồ nằm ở đâu khi cần dùng\".",
      "D": "\"Thế để tớ chuẩn bị hết cho cậu, cậu chỉ việc đi thôi\"."
    },
    "answer": "C",
    "explanation": "Thuyết phục bạn tự lập bằng thái độ tích cực, đồng hành và nêu rõ lợi ích thiết thực của việc tự sắp xếp đồ dùng cá nhân.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_30",
    "number": 30,
    "question": "Bạn thân của em (ở tuổi dậy thì) chia sẻ rằng bạn ấy cảm thấy tự ti vì cơ thể mập lên và bắt đầu mọc mụn trứng cá. Em nên động viên bạn thế nào?",
    "options": {
      "A": "\"Nhìn cậu dạo này béo thật, mụn nổi đầy mặt trông sợ quá\".",
      "B": "\"Chuyện này rất bình thường ở tuổi dậy thì mà! Bọn mình cùng ăn uống lành mạnh, tập thể thao và chăm sóc da đúng cách nhé. Cậu vẫn luôn là một người bạn tuyệt vời\".",
      "C": "\"Cậu nên nhịn ăn tối đi và mua kem trộn trên mạng về bôi là hết ngay\".",
      "D": "\"Đừng lo, đeo khẩu trang suốt ngày là không ai thấy mụn nữa đâu\"."
    },
    "answer": "B",
    "explanation": "Lời động viên chân thành giúp bạn giải tỏa áp lực tự ti về ngoại hình ở tuổi dậy thì, đồng thời hướng dẫn bạn những biện pháp chăm sóc sức khỏe khoa học.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_31",
    "number": 31,
    "question": "Khi đi du lịch, đồ dùng cá nhân nhỏ như bàn chải đánh răng, kem đánh răng và khăn mặt nên được xếp ở vị trí nào trong vali?",
    "options": {
      "A": "Nhét bừa vào góc vali cùng với giày bẩn.",
      "B": "Để vào một túi khóa kéo nhỏ chống thấm riêng biệt rồi đặt ở ngăn dễ lấy của vali.",
      "C": "Để bố mẹ tự cầm hộ trong túi của bố mẹ.",
      "D": "Bọc vào một tờ giấy báo cũ rồi vứt vào giữa đống quần áo sạch."
    },
    "answer": "B",
    "explanation": "Xếp đồ dùng vệ sinh cá nhân vào túi chống thấm riêng giúp giữ vệ sinh cho quần áo khác và giúp việc tìm kiếm, lấy ra sử dụng nhanh chóng.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_32",
    "number": 32,
    "question": "Trước ngày đi dã ngoại, em thấy dự báo thời tiết báo ngày mai có mưa rào. Em nên làm gì?",
    "options": {
      "A": "Hủy chuyến đi dã ngoại ngay lập tức và ở nhà ngủ.",
      "B": "Vẫn chuẩn bị đồ như bình thường và mang thêm áo mưa tiện lợi, ô gấp gọn và túi chống nước cho balo.",
      "C": "Mặc kệ dự báo thời tiết vì họ thường dự báo sai.",
      "D": "Khóc lóc bắt đền thầy cô giáo vì chọn ngày xấu."
    },
    "answer": "B",
    "explanation": "Chủ động xem thời tiết giúp chúng ta chuẩn bị phụ kiện phù hợp (áo mưa, ô) để buổi dã ngoại diễn ra an toàn.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_33",
    "number": 33,
    "question": "Răng sữa của em bắt đầu lung lay mạnh và sắp rụng. Cách xử lý nào sau đây là an toàn nhất?",
    "options": {
      "A": "Dùng một sợi chỉ bẩn tự buộc vào răng rồi giật mạnh thật nhanh.",
      "B": "Dùng tay chưa rửa sạch để lung lay răng liên tục.",
      "C": "Nhờ bố mẹ đưa đến nha sĩ kiểm tra hoặc để răng rụng tự nhiên khi ăn nhai đồ mềm, chú ý súc miệng nước muối ấm.",
      "D": "Lấy búa nhỏ gõ vào răng cho nhanh rụng."
    },
    "answer": "C",
    "explanation": "Tự ý nhổ răng bằng tay bẩn hoặc chỉ bẩn dễ gây nhiễm trùng lợi. Việc khám nha sĩ hoặc rụng tự nhiên an toàn hơn nhiều.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_34",
    "number": 34,
    "question": "Khi rửa mặt bằng sữa rửa mặt, bước đầu tiên em cần thực hiện là gì?",
    "options": {
      "A": "Lấy sữa rửa mặt xoa trực tiếp lên da mặt đang khô.",
      "B": "Rửa tay thật sạch bằng xà phòng để tránh đưa vi khuẩn từ tay lên mặt.",
      "C": "Dội nước thật nóng lên mặt để giãn nở lỗ chân lông.",
      "D": "Lấy khăn mặt chà xát thật mạnh lên da trước."
    },
    "answer": "B",
    "explanation": "Tay bẩn chứa nhiều vi khuẩn. Nếu không rửa tay sạch trước, vi khuẩn sẽ bám vào sữa rửa mặt và dễ gây mụn viêm trên da.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_35",
    "number": 35,
    "question": "Một bạn gái trong lớp có năng khiếu toán học rất giỏi nhưng bị một số bạn trêu là: \"Con gái học giỏi Toán làm gì, sau này cũng chỉ làm nội trợ thôi\". Em sẽ làm gì?",
    "options": {
      "A": "Im lặng đồng tình vì thấy các bạn nói cũng có lý.",
      "B": "Lên tiếng ủng hộ bạn gái và khẳng định năng lực học tập là của mỗi người, không phân biệt nam hay nữ, ai cũng có quyền theo đuổi ước mơ.",
      "C": "Khuyên bạn gái nên chuyển sang học văn cho phù hợp giới tính.",
      "D": "Trêu chọc cùng các bạn kia cho vui."
    },
    "answer": "B",
    "explanation": "Đứng lên bảo vệ bạn trước định kiến giới giúp thúc đẩy môi trường học đường bình đẳng, tôn trọng.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_36",
    "number": 36,
    "question": "Đâu là thói quen ăn uống giúp hạn chế tình trạng mụn trứng cá phát triển mạnh ở tuổi dậy thì?",
    "options": {
      "A": "Ăn nhiều đồ cay nóng, uống sữa đặc ngọt và nước ngọt có ga.",
      "B": "Ăn nhiều rau xanh, trái cây ít ngọt, uống đủ nước lọc và hạn chế đồ dầu mỡ, đồ ngọt.",
      "C": "Nhịn ăn tinh bột và chỉ ăn thịt mỡ gà rán.",
      "D": "Uống thật nhiều nước tăng lực mỗi ngày."
    },
    "answer": "B",
    "explanation": "Chế độ ăn nhiều đường, sữa động vật ngọt và dầu mỡ kích thích tuyến bã nhờn hoạt động mạnh, làm tăng nguy cơ bít tắc lỗ chân lông.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_37",
    "number": 37,
    "question": "Khi chuẩn bị quần áo đi dã ngoại leo núi, em nên chọn loại trang phục nào?",
    "options": {
      "A": "Váy xòe điệu đà và giày búp bê cao gót để chụp ảnh cho đẹp.",
      "B": "Quần áo thể thao co giãn tốt, thấm hút mồ hôi và giày thể thao vừa chân, có độ bám tốt.",
      "C": "Quần bò bó sát cứng và dép lê loẹt quẹt.",
      "D": "Mặc áo khoác phao thật dày dù trời đang mùa hè."
    },
    "answer": "B",
    "explanation": "Trang phục dã ngoại vận động cần ưu tiên sự thoải mái, an toàn khi di chuyển trên địa hình dốc gồ ghề.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_38",
    "number": 38,
    "question": "Nhận định nào sau đây là ĐÚNG về sự thay đổi cơ thể ở tuổi dậy thì?",
    "options": {
      "A": "Chỉ có bạn gái mới thay đổi cơ thể, bạn nam giữ nguyên như cũ.",
      "B": "Sự thay đổi cơ thể là một quá trình tự nhiên giúp chúng ta trưởng thành, mỗi người có tốc độ thay đổi nhanh chậm khác nhau và chúng ta cần tôn trọng điều đó.",
      "C": "Ai dậy thì muộn hơn các bạn trong lớp là bị bệnh nguy hiểm.",
      "D": "Dậy thì làm cơ thể trở nên xấu xí và đáng ghét."
    },
    "answer": "B",
    "explanation": "Dậy thì là quá trình sinh học tất yếu để cơ thể trẻ em chuyển thành cơ thể người lớn. Sự phát triển này khác nhau ở mỗi người.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_39",
    "number": 39,
    "question": "Khi đi khám răng, nếu cảm thấy đau trong lúc nha sĩ đang thao tác, em nên làm gì?",
    "options": {
      "A": "Bất ngờ ngồi bật dậy hoặc giật mạnh đầu ra sau.",
      "B": "Giơ một tay lên làm ký hiệu xin dừng lại để nha sĩ biết và điều chỉnh thao tác nhẹ nhàng hơn.",
      "C": "Giữ chặt tay nha sĩ để họ không làm được nữa.",
      "D": "Cố gắng chịu đựng và khóc thầm không nói gì."
    },
    "answer": "B",
    "explanation": "Thống nhất trước ký hiệu giơ tay với nha sĩ giúp kiểm soát cơn đau và đảm bảo an toàn, tránh các tai nạn do học sinh đột ngột chuyển động.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_40",
    "number": 40,
    "question": "Để da mặt sạch sâu sau khi đi ngoài đường bụi bẩn về, em nên làm gì?",
    "options": {
      "A": "Dùng khăn ướt có cồn lau mạnh nhiều lần.",
      "B": "Tẩy trang bằng nước tẩy trang dịu nhẹ, rửa mặt sạch bằng sữa rửa mặt và thấm khô bằng khăn bông sạch mềm.",
      "C": "Rửa mặt bằng nước lã thật nhanh trong 3 giây.",
      "D": "Lấy cồn y tế xịt thẳng lên mặt để diệt khuẩn."
    },
    "answer": "B",
    "explanation": "Quy trình làm sạch da đúng cách giúp loại bỏ bụi bẩn siêu mịn và dầu thừa tích tụ sau khi đi ngoài đường, ngăn ngừa hình thành nhân mụn.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG TỰ LẬP & CHĂM SÓC CƠ THỂ TUỔI DẬY THÌ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_41",
    "number": 41,
    "question": "Nếu vô tình bị bỏ quên một mình trên xe ô tô (hoặc xe đưa đón học sinh) đã khóa cửa, hành động đầu tiên em nên làm là gì?",
    "options": {
      "A": "Khóc lóc thảm thiết và nằm im chịu đựng dưới sàn xe.",
      "B": "Di chuyển lên ghế lái, nhấn còi liên tục (còi xe ô tô vẫn hoạt động ngay cả khi tắt máy), bật nút đèn cảnh báo nguy hiểm (nút tam giác màu đỏ), và vẫy tay ra hiệu qua cửa kính trước.",
      "C": "Tìm cách đập vỡ kính chắn gió phía trước bằng tay không.",
      "D": "Tìm đồ ăn nước uống trên xe để ăn cho đỡ đói rồi đi ngủ tiếp."
    },
    "answer": "B",
    "explanation": "Còi xe và đèn khẩn cấp hoạt động bằng nguồn điện trực tiếp từ ắc quy nên luôn hoạt động. Nhấn còi liên tục là cách nhanh nhất để thu hút sự chú ý.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_42",
    "number": 42,
    "question": "Khi đi chơi ở siêu thị hoặc công viên đông người và vô tình bị lạc mất bố mẹ, em nên làm gì?",
    "options": {
      "A": "Chạy lung tung khắp nơi để tìm bố mẹ và khóc thật to.",
      "B": "Đi theo một người lạ mặt hứa sẽ dẫn đi tìm bố mẹ.",
      "C": "Đứng yên tại vị trí bị lạc hoặc tìm đến quầy thông tin/bảo vệ của siêu thị, cung cấp số điện thoại của bố mẹ để nhờ phát loa tìm kiếm.",
      "D": "Tự bắt xe ôm hoặc taxi đi về nhà một mình."
    },
    "answer": "C",
    "explanation": "Đứng yên giúp bố mẹ dễ quay lại tìm thấy em. Nếu di chuyển, hãy tìm đến những người đáng tin cậy như nhân viên mặc đồng phục hoặc bảo vệ.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_43",
    "number": 43,
    "question": "Khi thấy một phích nước sôi hoặc nồi canh đang sôi trên bếp, hành động nào sau đây là an toàn?",
    "options": {
      "A": "Chạy nhảy đùa nghịch xung quanh khu vực bếp.",
      "B": "Tò mò mở nắp phích nước ra xem nước có nóng không.",
      "C": "Tránh xa phích nước và nồi canh sôi, không tự ý bê vác khi không có người lớn giám sát.",
      "D": "Dùng tay sờ vào vỏ nồi canh đang đun trên bếp gas."
    },
    "answer": "C",
    "explanation": "Bỏng nước sôi hoặc thức ăn nóng là tai nạn rất phổ biến ở trẻ em. Cần giữ khoảng cách an toàn với các nguồn nhiệt.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_44",
    "number": 44,
    "question": "Khi sử dụng thang cuốn tại trung tâm thương mại, tư thế đứng nào sau đây là đúng và an toàn?",
    "options": {
      "A": "Đứng quay mặt lại phía sau, ngồi bệt xuống bậc thang cuốn.",
      "B": "Đứng thẳng, chân đặt hoàn toàn bên trong một bậc thang (tránh mép vạch vàng), tay vịn chặt vào băng chuyền cao su bên cạnh.",
      "C": "Chạy nhảy, đi ngược chiều thang cuốn đang chạy.",
      "D": "Thò đầu và tay ra ngoài lan can bảo vệ của thang cuốn."
    },
    "answer": "B",
    "explanation": "Đứng gọn trong vạch màu vàng bảo vệ và vịn tay giúp giữ thăng bằng tốt, tránh bị kẹt giày dép vào các khe khe kẽ của thang.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_45",
    "number": 45,
    "question": "Một người lạ đến cổng trường lúc tan học và bảo với em: \"Bố mẹ cháu bận đột xuất nên nhờ cô/chú đón cháu về hộ. Đi theo cô/chú nhanh lên\". Em nên xử lý thế nào?",
    "options": {
      "A": "Tin lời người đó và lên xe đi theo ngay lập tức.",
      "B": "Lùi lại giữ khoảng cách an toàn, kiên quyết từ chối: \"Cháu không đi theo người lạ đâu ạ\" và chạy vào trường báo với thầy cô hoặc bác bảo vệ để xác minh.",
      "C": "Nhận kẹo ngọt người lạ đưa cho rồi đứng đợi cùng họ.",
      "D": "Mắng chửi người lạ thật to rồi tự đi bộ về nhà."
    },
    "answer": "B",
    "explanation": "Không bao giờ đi theo người lạ hoặc nhận quà cáp của người lạ khi chưa có sự xác nhận trực tiếp từ bố mẹ hoặc người thân.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_46",
    "number": 46,
    "question": "Khi phát hiện có đám cháy xảy ra trong tòa nhà cao tầng và có nhiều khói độc tràn vào hành lang, em nên thoát hiểm thế nào?",
    "options": {
      "A": "Chạy nhanh vào thang máy để xuống đất cho nhanh.",
      "B": "Mở cửa sổ nhảy thẳng xuống đất từ tầng cao.",
      "C": "Dùng khăn ướt che kín mũi miệng, hạ thấp người hoặc bò sát mặt đất, men theo tường tìm lối thoát hiểm cầu thang bộ.",
      "D": "Chui vào gầm giường hoặc tủ quần áo đóng chặt cửa lại để trốn lửa."
    },
    "answer": "C",
    "explanation": "Khói độc nhẹ hơn không khí nên sẽ bay lên cao. Bò sát đất giúp tránh hít phải khói độc. Tuyệt đối không dùng thang máy khi có hỏa hoạn.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_47",
    "number": 47,
    "question": "Khi đi tắm biển hoặc tắm hồ cùng gia đình, hành động nào giúp em phòng tránh nguy cơ đuối nước?",
    "options": {
      "A": "Tự ý nhảy xuống nước bơi mà không cần mặc áo phao và không có người lớn quan sát.",
      "B": "Luôn mặc áo phao, tắm ở khu vực nông được phép tắm và luôn có sự giám sát trực tiếp của người lớn biết bơi.",
      "C": "Thách đố các bạn bơi ra xa ngoài phao giới hạn an toàn.",
      "D": "Bơi ngay sau khi vừa ăn no hoặc khi trời đang có giông bão."
    },
    "answer": "B",
    "explanation": "Đuối nước xảy ra rất nhanh. Tuân thủ nội quy bãi tắm, mặc áo phao và có người lớn giám sát là những nguyên tắc cốt lõi.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_48",
    "number": 48,
    "question": "Em muốn sang đường tại một ngã tư đông đúc không có cầu vượt đi bộ. Em nên làm gì?",
    "options": {
      "A": "Cắm đầu chạy thật nhanh sang đường bất chấp các xe đang lao tới.",
      "B": "Vừa đi vừa nhìn màn hình điện thoại hoặc nghe nhạc.",
      "C": "Đứng trên vỉa hè quan sát tín hiệu đèn giao thông dành cho người đi bộ, đi vào vạch kẻ đường dành cho người đi bộ, giơ cao tay ra hiệu xin đường và chú ý quan sát hai bên.",
      "D": "Bám vào đuôi một chiếc xe tải đang chạy để họ kéo sang."
    },
    "answer": "C",
    "explanation": "Sang đường đúng vạch kẻ đường, tuân thủ đèn tín hiệu và chú ý quan sát xung quanh giúp giảm tối đa nguy cơ va chạm.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_49",
    "number": 49,
    "question": "Nếu bị mắc kẹt một mình trong thang máy bị hỏng đột ngột, hành động nào sau đây là SAI?",
    "options": {
      "A": "Nhấn nút mở cửa khẩn cấp hoặc nút chuông báo động để gọi cứu hộ.",
      "B": "Cố gắng cạy mạnh cửa thang máy hoặc trèo ra ngoài qua nắp trần thang máy.",
      "C": "Giữ bình tĩnh, tựa lưng vào vách thang máy, hơi khụy gối xuống để tránh chấn thương nếu thang rơi tự do.",
      "D": "Dùng điện thoại di động (nếu có sóng) hoặc gọi to để liên lạc với bên ngoài."
    },
    "answer": "B",
    "explanation": "Cố tình cạy cửa hoặc trèo qua trần thang máy rất nguy hiểm vì cabin có thể đột ngột chuyển động trở lại gây tai nạn nghiêm trọng.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_50",
    "number": 50,
    "question": "Em thấy một người lạ cứ đi theo sau mình từ ngõ vắng về nhà. Em nên xử lý thế nào?",
    "options": {
      "A": "Chạy thật nhanh vào chỗ tối tăm để trốn.",
      "B": "Đi chậm lại để xem người đó muốn làm gì mình.",
      "C": "Chạy nhanh đến nơi đông người (cửa hàng, nhà dân mở cửa) và hét to nhờ trợ giúp: \"Cứu cháu với, người này đang bám đuôi cháu!\".",
      "D": "Quay lại đánh nhau với người đó."
    },
    "answer": "C",
    "explanation": "Nhanh chóng di chuyển đến không gian đông người và la to để người xung quanh biết và can thiệp kịp thời, ngăn chặn ý đồ xấu của kẻ bám đuôi.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_51",
    "number": 51,
    "question": "Khi cắm phích cắm điện vào ổ điện để sử dụng quạt máy, em cần lưu ý điều gì?",
    "options": {
      "A": "Tay đang ướt nhẹp nước vẫn cầm phích cắm cắm vào ổ.",
      "B": "Giữ chặt phần dây điện phía xa rồi giật mạnh phích cắm ra khỏi ổ.",
      "C": "Đảm bảo tay khô ráo hoàn toàn, cầm vào phần nhựa bảo vệ của phích cắm và cắm dứt khoát vào ổ điện dưới sự hướng dẫn hoặc quan sát của người lớn.",
      "D": "Dùng đinh sắt chọc thử vào lỗ ổ điện trước khi cắm phích."
    },
    "answer": "C",
    "explanation": "Nước dẫn điện tốt. Cắm điện khi tay ướt hoặc cầm giật dây điện dễ gây rò rỉ và giật điện nguy hiểm đến tính mạng.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_52",
    "number": 52,
    "question": "Em vô tình phát hiện dưới gầm bàn học có một chai thủy tinh chứa nước màu xanh lá cây không có nhãn mác. Em nên làm gì?",
    "options": {
      "A": "Mở nắp uống thử xem có phải nước ngọt không.",
      "B": "Đổ nước đó ra tay xem có mát không.",
      "C": "Giữ nguyên chai nước, tránh xa và báo ngay cho bố mẹ hoặc người lớn biết để xử lý.",
      "D": "Ném mạnh chai nước vào sọt rác cho vỡ ra."
    },
    "answer": "C",
    "explanation": "Các hóa chất tẩy rửa hoặc chất độc hại thường được đựng trong chai lọ không nhãn mác. Tuyệt đối không nếm thử hoặc tiếp xúc trực tiếp.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_53",
    "number": 53,
    "question": "Đi xe đạp từ trong ngõ nhỏ ra đường lớn, em cần thực hiện thao tác nào?",
    "options": {
      "A": "Lao xe thật nhanh ra đường lớn mà không cần nhìn hai bên.",
      "B": "Giảm tốc độ, quan sát kỹ các phương tiện đi lại trên đường lớn cả hai hướng trái và phải, khi thấy an toàn mới từ từ rẽ ra đường lớn.",
      "C": "Vừa đi xe đạp vừa thả cả hai tay ra để biểu diễn.",
      "D": "Đi dàn hàng ba với các bạn cùng lớp cho vui."
    },
    "answer": "B",
    "explanation": "Góc khuất từ ngõ ra đường lớn rất nguy hiểm. Giảm tốc độ và quan sát kỹ giúp tránh va chạm đột ngột.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_54",
    "number": 54,
    "question": "Nếu thấy một bạn cùng lớp bị ngã xuống hồ nước sâu và đang vùng vẫy kêu cứu, em nên làm gì?",
    "options": {
      "A": "Lập tức nhảy ngay xuống hồ để cứu bạn dù mình không biết bơi.",
      "B": "Bỏ chạy đi chỗ khác vì sợ liên lụy.",
      "C": "Hô hoán thật to để tìm sự trợ giúp của người lớn gần đó; đồng thời tìm một cành cây dài, sợi dây hoặc ném phao để bạn bám vào.",
      "D": "Đứng trên bờ dùng điện thoại quay video đăng lên mạng xã hội."
    },
    "answer": "C",
    "explanation": "Tự ý nhảy xuống cứu người khi không có kỹ năng cứu hộ dễ dẫn đến việc cả hai cùng đuối nước. Dùng vật gián tiếp cứu hộ là phương pháp an toàn nhất.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_55",
    "number": 55,
    "question": "Khi gặp giông bão, sấm chớp lúc đang đi bộ trên đường, em nên tránh trú ẩn ở đâu?",
    "options": {
      "A": "Dưới một gốc cây to, cổ thụ bên đường hoặc gần cột điện cao thế.",
      "B": "Chạy vào trong các tòa nhà kiên cố, cửa hàng có mái che an toàn.",
      "C": "Đứng trên đỉnh đồi cao cầm theo một chiếc ô bằng kim loại giơ lên trời.",
      "D": "Nhảy xuống hồ nước gần đó để trú ẩn dưới nước."
    },
    "answer": "B",
    "explanation": "Cây to, cột điện và các vật kim loại cao dễ bị sét đánh trúng. Cần tìm các tòa nhà kiên cố để ẩn nấp.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_56",
    "number": 56,
    "question": "Em đang ở nhà một mình thì có người lạ gõ cửa bảo là nhân viên sửa đường ống nước bố mẹ nhờ đến. Em nên làm gì?",
    "options": {
      "A": "Mở cửa cho họ vào nhà ngay để họ sửa chữa.",
      "B": "Không mở cửa, nói vọng ra ngoài: \"Bố mẹ cháu đang bận một chút, cô/chú quay lại sau nhé\" rồi gọi điện thoại ngay cho bố mẹ để xác minh.",
      "C": "Khóa trái cửa lại rồi khóc thật to cho hàng xóm nghe thấy.",
      "D": "Mở hé cửa và thò đầu ra ngoài nói chuyện với họ."
    },
    "answer": "B",
    "explanation": "Không bao giờ mở cửa cho người lạ vào nhà khi ở một mình. Dùng lý do bố mẹ có nhà nhưng bận để kẻ xấu không biết em đang ở một mình.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_57",
    "number": 57,
    "question": "Khi đi bộ trên vỉa hè mà vỉa hè bị chắn lối bởi các phương tiện đỗ xe, em phải đi xuống lòng đường. Em nên đi như thế nào?",
    "options": {
      "A": "Đi sát mép đường bên phải theo chiều xe chạy và luôn chú ý quan sát các phương tiện đi tới từ phía sau.",
      "B": "Đi ra giữa lòng đường để các xe dễ nhìn thấy mình.",
      "C": "Đi ngược chiều xe chạy để dễ quan sát các phương tiện lao tới mình và nhanh chóng đi lên lại vỉa hè khi có thể.",
      "D": "Đi dàn hàng ngang với các bạn và đùa giỡn dưới lòng đường."
    },
    "answer": "C",
    "explanation": "Khi buộc phải đi dưới lòng đường, đi ngược chiều xe chạy giúp em nhìn thấy rõ xe đi hướng đối diện tiến lại để chủ động tránh né kịp thời.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_58",
    "number": 58,
    "question": "Tại sao khi ngồi trên xe máy, xe đạp điện tham gia giao thông, chúng ta bắt buộc phải đội mũ bảo hiểm và cài quai đúng quy cách?",
    "options": {
      "A": "Để tránh bị công an giao thông xử phạt bố mẹ.",
      "B": "Giúp bảo vệ vùng đầu và não bộ khỏi chấn thương nguy hiểm nếu vô tình xảy ra tai nạn va chạm.",
      "C": "Để đội mũ cho ấm đầu khi trời lạnh.",
      "D": "Đội mũ bảo hiểm nhìn trông cá tính hơn."
    },
    "answer": "B",
    "explanation": "Mũ bảo hiểm bảo vệ hộp sọ khỏi các chấn thương sọ não nghiêm trọng khi có va đập mạnh.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_59",
    "number": 59,
    "question": "Nếu nhà em ở chung cư và chuông báo cháy đột ngột reo vang liên tục, em nên làm gì?",
    "options": {
      "A": "Thu dọn hết đồ chơi yêu thích và máy tính bỏ vào balo rồi mới đi.",
      "B": "Lập tức chạy ra lối thoát hiểm bộ, không dùng thang máy và di chuyển nhanh chóng xuống dưới theo hướng dẫn.",
      "C": "Chờ đến khi thấy lửa cháy bén vào cửa phòng mới chạy thoát thân.",
      "D": "Trèo ra ngoài ban công đứng vẫy tay gọi cứu trợ."
    },
    "answer": "B",
    "explanation": "Khi chuông báo cháy kêu, cần thoát hiểm ngay lập tức vì đám cháy và khói độc lan ra rất nhanh. Không dùng thang máy vì dễ bị kẹt khi mất điện.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_60",
    "number": 60,
    "question": "Khi sử dụng dao hoặc kéo để cắt thủ công trong lớp học, hành động nào sau đây là an toàn?",
    "options": {
      "A": "Cầm kéo chạy đuổi nhau đùa nghịch quanh lớp học.",
      "B": "Dùng kéo hướng mũi nhọn về phía người bạn bên cạnh khi nói chuyện.",
      "C": "Cầm kéo chắc chắn bằng tay thuận, cắt nhẹ nhàng trên mặt bàn và đưa kéo cho bạn bằng cách hướng phần tay cầm về phía bạn.",
      "D": "Dùng kéo cắt thử vào dây điện hoặc tóc của bạn."
    },
    "answer": "C",
    "explanation": "Sử dụng dụng cụ sắc nhọn đúng cách và chuyển giao an toàn (hướng phần chuôi cầm về phía đối phương) giúp ngăn ngừa tai nạn thương tích.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG AN TOÀN & THOÁT HIỂM",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_61",
    "number": 61,
    "question": "Khi em hoặc bạn bên cạnh bị chảy máu cam, tư thế ngồi xử lý nào sau đây là ĐÚNG Y KHOA?",
    "options": {
      "A": "Ngửa cổ ra phía sau hết cỡ và lấy bông nhét thật sâu vào lỗ mũi.",
      "B": "Ngồi thẳng lưng, hơi cúi đầu nhẹ về phía trước, dùng ngón cái và ngón trỏ bóp chặt hai cánh mũi trong khoảng 5-10 phút và thở bằng miệng.",
      "C": "Nằm ngửa ra đất và uống nước ấm.",
      "D": "Chạy nhảy liên tục để máu chảy ra hết rồi dừng lại."
    },
    "answer": "B",
    "explanation": "Hơi cúi đầu về phía trước giúp máu không chảy ngược vào họng gây sặc. Bóp chặt cánh mũi giúp ép mạch máu ngăn chảy máu tiếp.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_62",
    "number": 62,
    "question": "Em cảm thấy trán mình rất nóng, người run bần bật vì lạnh và mệt mỏi trong giờ học. Em nên làm gì?",
    "options": {
      "A": "Cố gắng chịu đựng học tiếp để không bị lỡ bài học.",
      "B": "Báo ngay với cô giáo chủ nhiệm hoặc nhân viên y tế trường học để được kiểm tra sức khỏe và báo bố mẹ đưa đi khám nếu sốt cao.",
      "C": "Tự ý lấy thuốc hạ sốt của bạn khác uống đại.",
      "D": "Ra vòi nước lạnh của trường dội lên đầu cho mát."
    },
    "answer": "B",
    "explanation": "Khi có dấu hiệu sốt, cần được nhân viên y tế kiểm tra và chăm sóc y tế phù hợp. Học sinh không tự ý uống thuốc khi không có chỉ định từ người lớn.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_63",
    "number": 63,
    "question": "Vô tình bị một con chó lạ cắn chảy máu ở bắp chân khi đang đi bộ ngoài đường, hành động sơ cứu đầu tiên là gì?",
    "options": {
      "A": "Rửa sạch vết thương dưới vòi nước chảy mạnh với xà phòng trong ít nhất 15 phút, sát trùng vết thương, rồi báo ngay bố mẹ đưa đi tiêm phòng dại.",
      "B": "Đuổi theo con chó để đánh trả trả thù.",
      "C": "Lấy lá cây ven đường nhai nát đắp vào vết thương để cầm máu.",
      "D": "Mặc kệ vết thương vì thấy máu chảy ra rất ít."
    },
    "answer": "A",
    "explanation": "Rửa vết thương bằng nước sạch và xà phòng giúp rửa trôi phần lớn virus dại bám từ nước bọt của chó. Tiêm phòng dại sau đó là bắt buộc.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_64",
    "number": 64,
    "question": "Tại sao không nên ngửa cổ ra sau khi bị chảy máu cam?",
    "options": {
      "A": "Vì ngửa cổ ra sau sẽ làm máu chảy ra nhiều hơn.",
      "B": "Vì máu có thể chảy ngược xuống họng gây sặc đường thở, ho hoặc nuốt vào dạ dày gây buồn nôn, khó chịu.",
      "C": "Vì ngửa cổ lâu sẽ bị mỏi cổ và hỏng cột sống.",
      "D": "Vì ngửa cổ làm chảy nước mắt nhiều hơn."
    },
    "answer": "B",
    "explanation": "Tư thế ngửa cổ là sai khoa học vì nó không cầm được máu mà chỉ khiến máu chảy ngược vào bên trong cơ thể gây kích ứng đường thở.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_65",
    "number": 65,
    "question": "Khi bị sốt nhẹ ở nhà, bố mẹ hướng dẫn em thực hiện cách nào giúp hạ thân nhiệt an toàn?",
    "options": {
      "A": "Mặc thật nhiều áo ấm, đắp chăn bông dày kín đầu để vã mồ hôi.",
      "B": "Mặc quần áo thoáng mát, uống nhiều nước ấm, dùng khăn ấm lau các vùng nách, bẹn và trán.",
      "C": "Tắm bằng nước đá lạnh để hạ sốt nhanh nhất.",
      "D": "Đóng kín hết các cửa sổ và bật điều hòa chế độ lạnh sâu 16 độ C."
    },
    "answer": "B",
    "explanation": "Lau khăn ấm giúp giãn mạch máu ngoại biên để thoát nhiệt tốt hơn. Đắp chăn dày làm giữ nhiệt khiến thân nhiệt tăng cao nguy hiểm.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_66",
    "number": 66,
    "question": "Sau khi rửa vết thương do động vật cắn bằng xà phòng, em nên băng bó vết thương thế nào trước khi đến bệnh viện?",
    "options": {
      "A": "Băng bó thật chặt vết thương bằng băng thun kín mít để không khí không vào được.",
      "B": "Che nhẹ vết thương bằng gạc vô trùng hoặc vải sạch thoáng, không băng bó quá chặt hoặc khâu kín vết thương ngay lập tức.",
      "C": "Lấy băng keo cá nhân dán đè trực tiếp lên vết rách sâu.",
      "D": "Để hở hoàn toàn vết thương và để bụi bẩn bám vào thoải mái."
    },
    "answer": "B",
    "explanation": "Vết thương do động vật cắn không nên khâu kín hoặc băng quá chặt vì vi khuẩn kị khí (uốn ván) sẽ dễ phát triển. Che nhẹ bằng gạc sạch để bảo vệ vết thương.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_67",
    "number": 67,
    "question": "Bạn của em bị chảy máu cam ở sân trường. Sau 10 phút bóp cánh mũi và cúi đầu mà máu vẫn chảy không ngừng và bạn có biểu hiện chóng mặt. Em nên làm gì?",
    "options": {
      "A": "Bảo bạn tiếp tục chờ thêm 30 phút nữa xem thế nào.",
      "B": "Nhanh chóng đưa bạn đến phòng y tế trường học hoặc gọi ngay cấp cứu y tế vì chảy máu cam kéo dài có thể là dấu hiệu nguy hiểm.",
      "C": "Cho bạn uống một cốc nước đá thật lạnh để đông máu.",
      "D": "Dùng giấy vệ sinh cuộn lại nhét chặt vào hai bên mũi bạn."
    },
    "answer": "B",
    "explanation": "Chảy máu cam liên tục quá 15 phút hoặc kèm theo các dấu hiệu mất máu như chóng mặt, nhợt nhạt cần được can thiệp y tế khẩn cấp.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_68",
    "number": 68,
    "question": "Nếu nhiệt độ cơ thể đo được là 39 độ C (sốt cao), biến chứng nguy hiểm nào dễ xảy ra với trẻ em nếu không hạ sốt kịp thời?",
    "options": {
      "A": "Bị rụng hết tóc và răng.",
      "B": "Bị co giật do sốt cao, mất nước nặng gây ảnh hưởng đến não bộ.",
      "C": "Bị tăng chiều cao đột ngột.",
      "D": "Bị biến thành người khổng lồ xanh."
    },
    "answer": "B",
    "explanation": "Sốt cao trên 38.5 - 39 độ C ở trẻ em có nguy cơ cao gây co giật toàn thân, thiếu oxy não. Cần dùng thuốc hạ sốt theo chỉ định của y tế.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_69",
    "number": 69,
    "question": "Con mèo nhà em nuôi cào nhẹ vào tay em làm xước da nhẹ và chảy một ít máu. Em nên xử lý thế nào?",
    "options": {
      "A": "Rửa sạch bằng xà phòng dưới vòi nước chảy, bôi sát trùng và theo dõi sức khỏe của con mèo; nếu mèo chưa tiêm phòng dại hoặc có biểu hiện lạ, phải báo bố mẹ đưa đi tiêm phòng ngay.",
      "B": "Đánh con mèo để dạy dỗ nó không được cào chủ.",
      "C": "Bỏ qua vết thương vì là mèo nhà nuôi nên hoàn toàn sạch sẽ.",
      "D": "Lấy băng keo dán kín vết xước lại và không nói với ai."
    },
    "answer": "A",
    "explanation": "Mèo nhà nuôi vẫn có nguy cơ mang virus dại hoặc vi khuẩn gây bệnh. Do đó vẫn cần sơ cứu rửa xà phòng kỹ lưỡng và theo dõi thú nuôi.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_70",
    "number": 70,
    "question": "Bạn em bị ngã trầy xước đầu gối chảy máu khi chơi đá bóng. Vết thương bám nhiều cát bẩn. Em nên giúp bạn sơ cứu như thế nào?",
    "options": {
      "A": "Dùng tay chưa rửa phủi hết cát bẩn trên vết thương của bạn ra.",
      "B": "Đưa bạn đến vòi nước sạch, dội nước nhẹ nhàng để trôi hết cát bẩn, rửa sạch vết thương bằng nước muối sinh lý, bôi thuốc sát trùng nhẹ và băng gạc sạch.",
      "C": "Rắc bột thuốc lào hoặc tàn thuốc lá lên vết thương để cầm máu nhanh.",
      "D": "Dùng cồn đỏ đổ trực tiếp một lượng lớn vào vết thương hở sâu."
    },
    "answer": "B",
    "explanation": "Rửa trôi cát bẩn bằng nước sạch ngăn ngừa nhiễm trùng cát bụi và uốn ván. Tuyệt đối không đắp các chất lạ (bột thuốc lào, lá cây) vì gây nhiễm trùng nặng hơn.",
    "topic": "CHỦ ĐỀ 4: SƠ CẤP CỨU CƠ BẢN",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_71",
    "number": 71,
    "question": "Theo quy tắc \"Vùng riêng tư\" trên cơ thể, những bộ phận nào là vùng riêng tư tuyệt đối không ai được phép nhìn hoặc chạm vào (trừ khi bố mẹ vệ sinh cho khi nhỏ hoặc bác sĩ khám bệnh có sự chứng kiến của bố mẹ)?",
    "options": {
      "A": "Bàn tay, bàn chân và bờ vai.",
      "B": "Khuỷu tay, đầu gối và mái tóc.",
      "C": "Miệng, ngực, vùng giữa hai đùi (vùng kín) và mông.",
      "D": "Lưng, tai và gáy."
    },
    "answer": "C",
    "explanation": "Vùng đồ bơi (hoặc vùng đồ lót) gồm ngực, vùng kín, mông và miệng là những vùng riêng tư của mỗi người. Không ai được quyền xem hoặc chạm vào tự tiện.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_72",
    "number": 72,
    "question": "Đâu là một ví dụ về \"Động chạm an toàn\" mà em cảm thấy thoải mái và vui vẻ?",
    "options": {
      "A": "Bị một người lạ ôm chặt lấy từ phía sau và sờ vào mông.",
      "B": "Thầy cô giáo hoặc bố mẹ xoa đầu khen ngợi, hoặc cái đập tay (high-five) chúc mừng của bạn bè khi em làm tốt.",
      "C": "Một người bạn ép em phải thơm vào má bạn ấy thì mới cho chơi cùng.",
      "D": "Bác sĩ yêu cầu em cởi hết quần áo để khám bệnh khi không có bố mẹ ở đó."
    },
    "answer": "B",
    "explanation": "Động chạm an toàn là những cử chỉ thể hiện tình cảm, sự động viên lành mạnh, công khai và đem lại cảm giác dễ chịu, tôn trọng cho em.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_73",
    "number": 73,
    "question": "Một người quen của gia đình rủ em vào phòng tối chơi và bảo: \"Bác cháu mình chơi trò bí mật nhé, bác sẽ chạm vào người cháu và cháu không được kể với bố mẹ, nếu kể bác sẽ phạt\". Đây là loại báo động nào trong \"5 báo động xâm hại\"?",
    "options": {
      "A": "Báo động nhìn (Nhìn vùng riêng tư).",
      "B": "Báo động ôm.",
      "C": "Báo động nói.",
      "D": "Báo động bí mật (Yêu cầu giữ bí mật về các hành vi chạm vào cơ thể)."
    },
    "answer": "D",
    "explanation": "Báo động bí mật là dấu hiệu cảnh báo lớn của hành vi xâm hại. Kẻ xấu thường dùng sự đe dọa hoặc quà cáp để buộc trẻ em giữ bí mật về những hành vi đụng chạm sai trái.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_74",
    "number": 74,
    "question": "Nếu có ai đó cố tình chạm vào vùng riêng tư của em hoặc yêu cầu em chạm vào vùng riêng tư của họ, hành động nào sau đây là ĐÚNG?",
    "options": {
      "A": "Hét to: \"KHÔNG!\", nhanh chóng chạy ra xa đến nơi an toàn và kể ngay lập tức với bố mẹ hoặc thầy cô giáo biết.",
      "B": "Im lặng vì sợ bị người đó trừng phạt hoặc xấu hổ với bạn bè.",
      "C": "Nhận tiền của họ để giữ bí mật chuyện này.",
      "D": "Nghĩ rằng lỗi hoàn toàn do mình nên tự trách bản thân."
    },
    "answer": "A",
    "explanation": "Em có quyền bảo vệ cơ thể mình. Việc lên tiếng phản kháng quyết liệt và chia sẻ ngay với người lớn đáng tin cậy là cách bảo vệ tốt nhất. Em hoàn toàn không có lỗi trong tình huống này.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_75",
    "number": 75,
    "question": "Khi đi khám bệnh, bác sĩ muốn kiểm tra vùng ngực hoặc vùng bụng của em. Quy trình nào sau đây là đúng quy tắc an toàn?",
    "options": {
      "A": "Bác sĩ khám bệnh một mình trong phòng kín khóa cửa và cấm bố mẹ vào.",
      "B": "Bác sĩ giải thích rõ lý do cần khám, thực hiện nhẹ nhàng và bắt buộc phải có sự chứng kiến, đồng ý của bố mẹ hoặc người giám hộ của em.",
      "C": "Bác sĩ yêu cầu em không được kể với bố mẹ về việc khám bệnh.",
      "D": "Bác sĩ vừa khám vừa chụp ảnh vùng nhạy cảm của em để đăng lên mạng xã hội."
    },
    "answer": "B",
    "explanation": "Bác sĩ chỉ thăm khám vùng nhạy cảm khi có lý do y khoa chính đáng, phải giải thích cho trẻ và phải có sự giám sát trực tiếp của cha mẹ.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_76",
    "number": 76,
    "question": "Quy tắc \"5 ngón tay\" giúp em phân loại các mối quan hệ để giao tiếp an toàn. Theo quy tắc này, ngón út (ngón xa nhất) đại diện cho ai và em nên ứng xử thế nào?",
    "options": {
      "A": "Đại diện cho bố mẹ - em có thể ôm hôn thoải mái.",
      "B": "Đại diện cho thầy cô, bạn bè - em có thể nắm tay, khoác vai.",
      "C": "Đại diện cho người hoàn toàn xa lạ - em không được đi cùng, không nhận quà và giữ khoảng cách an toàn, tuyệt đối không cho chạm vào người.",
      "D": "Đại diện cho họ hàng - em có thể ngủ chung giường."
    },
    "answer": "C",
    "explanation": "Ngón út đại diện cho người lạ. Với người lạ, cần giữ khoảng cách, cảnh giác cao và kiên quyết từ chối mọi đụng chạm thể xác để phòng ngừa nguy cơ.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_77",
    "number": 77,
    "question": "Một người hàng xóm mời em sang nhà chơi khi nhà họ không có ai khác và bảo em xem những hình ảnh, video mát mẻ, không mặc quần áo trên điện thoại của họ. Đây là loại báo động nào?",
    "options": {
      "A": "Báo động nhìn (Kẻ xấu muốn cho em nhìn hình ảnh khỏa thân hoặc nhìn vùng riêng tư của em).",
      "B": "Báo động nói.",
      "C": "Báo động chạm.",
      "D": "Báo động một mình."
    },
    "answer": "A",
    "explanation": "Báo động nhìn bao gồm việc kẻ xấu nhìn vào vùng riêng tư của trẻ hoặc ép buộc trẻ nhìn hình ảnh nhạy cảm. Đây là hành vi xâm hại tinh thần nghiêm trọng.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_78",
    "number": 78,
    "question": "Tại sao việc chia sẻ câu chuyện bị đụng chạm không an toàn với bố mẹ lại cực kỳ quan trọng, ngay cả khi em đã hứa giữ bí mật với người khác?",
    "options": {
      "A": "Để bố mẹ phạt em vì đã làm chuyện sai trái.",
      "B": "Vì bố mẹ là những người yêu thương và bảo vệ em tốt nhất, giúp em ngăn chặn kẻ xấu tiếp tục làm hại em và các bạn khác.",
      "C": "Để bố mẹ đòi tiền bồi thường từ kẻ xấu.",
      "D": "Chuyện này không quan trọng, không nên nói ra làm bố mẹ lo lắng."
    },
    "answer": "B",
    "explanation": "Bố mẹ luôn đứng về phía em. Kẻ xấu thường dùng lời nói dối để dọa dẫm trẻ. Việc nói thật với bố mẹ sẽ phá vỡ âm mưu giữ bí mật của kẻ xâm hại.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_79",
    "number": 79,
    "question": "Em đang đi bộ ở công viên thì có một người đàn ông lạ mặt tiến đến và ôm chầm lấy em thật chặt, bắt đầu sờ soạng. Em nên hét lên câu nào để thu hút sự cứu giúp nhanh nhất từ xung quanh?",
    "options": {
      "A": "\"Thả tôi ra, tôi mệt quá!\".",
      "B": "\"Bác làm gì thế ạ?\".",
      "C": "\"CỨU CHÁU VỚI! NGƯỜI NÀY XÂM HẠI CHÁU! CHÁU KHÔNG QUEN NGƯỜI NÀY!\".",
      "D": "Im lặng chịu đựng để chạy trốn sau."
    },
    "answer": "C",
    "explanation": "Hét to rõ ràng nội dung \"Cứu với\", chỉ rõ hành vi \"xâm hại\" và khẳng định \"không quen biết\" giúp người xung quanh nhận diện tình huống nguy hiểm và can thiệp lập tức.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Tự_chăm_sóc_&_An_toàn_cá_nhân_80",
    "number": 80,
    "question": "Đâu là hành vi xâm hại tình cảm/tinh thần mà học sinh tiểu học cần nhận biết và phòng tránh?",
    "options": {
      "A": "Bố mẹ nhắc nhở em phải học bài đúng giờ.",
      "B": "Bạn bè trêu chọc ác ý, cô lập em hoặc đe dọa tung hình ảnh xấu của em lên mạng để ép em làm theo ý họ.",
      "C": "Thầy cô giáo phê bình em khi em làm bài tập sai.",
      "D": "Bác bảo vệ yêu cầu em xếp hàng khi vào cổng trường."
    },
    "answer": "B",
    "explanation": "Việc đe dọa, cô lập, thao túng tâm lý hoặc sử dụng hình ảnh nhạy cảm để ép buộc trẻ em làm điều mình không muốn là các hành vi xâm hại tinh thần.",
    "topic": "CHỦ ĐỀ 5: PHÒNG TRÁNH XÂM HẠI & BẢO VỆ CƠ THỂ",
    "group": "Tự chăm sóc & An toàn cá nhân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_1",
    "number": 1,
    "question": "Khi một bạn cùng lớp trêu em là \"Em có cặp kính cận dày như đít chai và trông thật ngố\", em nên suy nghĩ thế nào?",
    "options": {
      "A": "Ghét bỏ bản thân và nghĩ mình là một người xấu xí.",
      "B": "Nhận ra rằng đeo kính giúp em nhìn rõ để học tốt hơn, kính cận là một nét riêng của em và điều đó không làm giảm giá trị của em.",
      "C": "Khóc lóc đòi bố mẹ cho đi phẫu thuật mắt ngay lập tức.",
      "D": "Vứt kính đi không đeo nữa dù mắt không nhìn rõ."
    },
    "answer": "B",
    "explanation": "Tự nhận thức và tôn trọng bản thân giúp học sinh hiểu rằng mỗi cá nhân có những đặc điểm riêng biệt và cần trân trọng điều đó, không để lời trêu chọc làm tổn thương lòng tự trọng.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_2",
    "number": 2,
    "question": "Điểm mạnh của bản thân được hiểu là gì?",
    "options": {
      "A": "Những điều em làm tốt, năng khiếu tự nhiên hoặc những tính cách tốt đẹp của em.",
      "B": "Việc em có thể đánh thắng được nhiều bạn trong lớp.",
      "C": "Việc em luôn đòi bố mẹ mua cho những đồ chơi đắt tiền nhất.",
      "D": "Việc em chưa bao giờ mắc lỗi hay làm sai bất cứ điều gì."
    },
    "answer": "A",
    "explanation": "Điểm mạnh bao gồm các năng lực học tập, năng khiếu thể thao/nghệ thuật, các thói quen tốt và các phẩm chất tích cực (như trung thực, tốt bụng).",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_3",
    "number": 3,
    "question": "Làm thế nào để em nhận biết được điểm yếu của mình một cách tích cực?",
    "options": {
      "A": "Coi đó là khuyết điểm vĩnh viễn và không thể thay đổi được.",
      "B": "Lắng nghe nhận xét chân thành của người khác và quan sát những việc mình làm chưa tốt để lên kế hoạch cải thiện (tư duy phát triển).",
      "C": "Che giấu hoàn toàn điểm yếu và đổ lỗi cho người khác khi làm sai.",
      "D": "Tránh xa các công việc khó để người khác không thấy điểm yếu của mình."
    },
    "answer": "B",
    "explanation": "Nhận biết điểm yếu giúp chúng ta hiểu mình cần cải thiện điều gì. Với tư duy phát triển, điểm yếu chỉ là những điều hiện tại mình làm chưa tốt nhưng nỗ lực sẽ tiến bộ hơn.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_4",
    "number": 4,
    "question": "Khi cô giáo chủ nhiệm cần tìm một bạn xung phong làm MC cho chương trình văn nghệ của lớp, em rất muốn thử nhưng chưa làm bao giờ. Hành vi tự tin là:",
    "options": {
      "A": "Chủ động giơ tay đăng ký và tự nhủ: \"Mình sẽ luyện tập chăm chỉ để làm tốt việc này\".",
      "B": "Rụt rè không dám giơ tay vì sợ các bạn cười chê nếu làm không tốt.",
      "C": "Chỉ giơ tay khi cô giáo hứa sẽ thưởng tiền.",
      "D": "Ép bạn khác phải đăng ký thay mình."
    },
    "answer": "A",
    "explanation": "Tự tin không phải là biết làm mọi thứ hoàn hảo ngay lập tức, mà là sự can đảm chủ động nhận nhiệm vụ thách thức bản thân và tin vào khả năng học hỏi của mình.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_5",
    "number": 5,
    "question": "Sự tự tin khác với sự tự kiêu (tự cao tự đại) ở điểm nào?",
    "options": {
      "A": "Người tự tin luôn cho rằng mình giỏi hơn tất cả mọi người.",
      "B": "Người tự tin tin vào giá trị của bản thân nhưng vẫn biết lắng nghe, học hỏi và tôn trọng người khác; người tự kiêu luôn coi thường người khác.",
      "C": "Người tự kiêu là người học giỏi hơn người tự tin.",
      "D": "Không có gì khác nhau, cả hai đều là người kiêu ngạo."
    },
    "answer": "B",
    "explanation": "Lòng tự tin đi liền với sự tôn trọng đối với người khác. Tự kiêu là sự phóng đại bản thân và hạ thấp người xung quanh, cản trở việc học hỏi và xây dựng mối quan hệ tốt đẹp.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_6",
    "number": 6,
    "question": "Khi em làm bài kiểm tra bị điểm kém, hành động nào thể hiện lòng tự trọng và tôn trọng bản thân?",
    "options": {
      "A": "Giấu tờ bài kiểm tra đi hoặc sửa điểm để bố mẹ không biết.",
      "B": "Nhìn nhận lỗi sai của mình, tự hứa sẽ học bài kỹ hơn và nhờ thầy cô hoặc bạn bè hướng dẫn lại những câu chưa hiểu.",
      "C": "Khóc lóc tự trách mình là kẻ ngốc nghếch, vô dụng.",
      "D": "Đổ lỗi cho đề thi quá khó hoặc cô giáo chấm thiên vị."
    },
    "answer": "B",
    "explanation": "Người có lòng tự trọng nhìn nhận trung thực kết quả của mình, chịu trách nhiệm và nỗ lực vươn lên thay vì trốn tránh hoặc tự hạ thấp giá trị bản thân.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_7",
    "number": 7,
    "question": "Điều gì tạo nên sự đặc biệt duy nhất của em so với các bạn khác?",
    "options": {
      "A": "Quần áo đắt tiền em mặc hàng ngày.",
      "B": "Sự kết hợp giữa ngoại hình, sở thích, tính cách, ước mơ và những trải nghiệm riêng của chính em.",
      "C": "Điểm số cao nhất lớp của em.",
      "D": "Việc em có nhiều đồ chơi công nghệ hiện đại hơn bạn."
    },
    "answer": "B",
    "explanation": "Mỗi người là một cá thể độc lập và duy nhất. Sự đặc biệt nằm ở thế giới nội tâm, tính cách và những giá trị cá nhân chứ không nằm ở vật chất bên ngoài.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_8",
    "number": 8,
    "question": "Bạn của em nhận xét: \"Cậu vẽ tranh rất đẹp nhưng khi thuyết trình thì giọng nói hơi nhỏ\". Em nên phản hồi thế nào?",
    "options": {
      "A": "Giận dỗi bạn và bảo: \"Cậu thì giỏi gì mà nhận xét tớ!\".",
      "B": "Cảm ơn bạn vì đã chỉ ra điểm mạnh (vẽ đẹp) và điểm yếu (thuyết trình nhỏ) để em chú ý luyện tập giọng nói to hơn trong lần sau.",
      "C": "Không bao giờ vẽ tranh nữa.",
      "D": "Khóc lóc bắt đền bạn."
    },
    "answer": "B",
    "explanation": "Đón nhận phản hồi một cách tích cực là kỹ năng quan trọng giúp tự nhận thức bản thân toàn diện hơn.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_9",
    "number": 9,
    "question": "Khi tham gia hoạt động nhóm ở lớp, em nên nhận nhiệm vụ nào?",
    "options": {
      "A": "Không nhận việc gì, để các bạn tự làm hết.",
      "B": "Chủ động nhận nhiệm vụ dựa trên điểm mạnh của mình (ví dụ vẽ tranh vẽ sơ đồ tư duy nếu vẽ đẹp, hoặc viết báo cáo nếu chữ đẹp).",
      "C": "Tranh giành làm nhóm trưởng dù chưa có kinh nghiệm tổ chức.",
      "D": "Chỉ làm những việc dễ nhất và nhanh nhất để được chơi."
    },
    "answer": "B",
    "explanation": "Làm việc nhóm hiệu quả nhất khi mỗi thành viên biết tự nhận thức năng lực của mình và đảm nhận vai trò phù hợp nhất với điểm mạnh cá nhân.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_10",
    "number": 10,
    "question": "Hành động nào sau đây thể hiện sự TÔN TRỌNG BẢN THÂN?",
    "options": {
      "A": "Thức khuya chơi game đến 2 giờ sáng.",
      "B": "Ăn uống lành mạnh, tập thể dục đều đặn, giữ vệ sinh cơ thể sạch sẽ và luôn suy nghĩ tích cực.",
      "C": "Nói dối để không bị phạt khi mắc lỗi.",
      "D": "Luôn cố gắng làm hài lòng người khác bất kể điều đó có hại cho mình."
    },
    "answer": "B",
    "explanation": "Tôn trọng bản thân thể hiện qua việc chăm sóc sức khỏe thể chất và nuôi dưỡng tinh thần lành mạnh mỗi ngày.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_11",
    "number": 11,
    "question": "Em thấy một bạn trong lớp có hoàn cảnh khó khăn và mặc quần áo cũ đi học. Lựa chọn suy nghĩ nào là đúng đắn?",
    "options": {
      "A": "Tránh xa bạn vì sợ bạn làm ảnh hưởng đến hình ảnh của mình.",
      "B": "Hiểu rằng hoàn cảnh vật chất không quyết định giá trị con người bạn, tôn trọng bạn và sẵn sàng chia sẻ, giúp đỡ bạn.",
      "C": "Trêu chọc bạn cùng các bạn khác trong lớp.",
      "D": "Khuyên bạn nên nghỉ học ở nhà đi làm kiếm tiền."
    },
    "answer": "B",
    "explanation": "Nhận thức được giá trị đích thực của con người giúp học sinh tôn trọng bạn bè xung quanh, bất kể sự khác biệt về hoàn cảnh xã hội.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_12",
    "number": 12,
    "question": "Đâu là biểu hiện của một người có lòng tự trọng cao?",
    "options": {
      "A": "Không bao giờ nhận lỗi khi làm sai vì sợ mất thể diện.",
      "B": "Trung thực trong kiểm tra, giữ lời hứa và tự chịu trách nhiệm về hành vi của mình.",
      "C": "Luôn muốn được mọi người ca ngợi mọi lúc mọi nơi.",
      "D": "Xem thường những người có học lực yếu hơn mình."
    },
    "answer": "B",
    "explanation": "Lòng tự trọng gắn liền với sự trung thực, chính trực và trách nhiệm đối với hành động của chính mình.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_13",
    "number": 13,
    "question": "Khi được cô giáo khen ngợi trước lớp vì đã giúp đỡ một bạn khuyết tật học bài, em nên có thái độ thế nào?",
    "options": {
      "A": "Khoe khoang khắp trường rằng mình là người tốt nhất thế giới.",
      "B": "Cảm ơn cô giáo, cảm thấy vui vẻ tự hào và tiếp tục giúp đỡ bạn bằng sự chân thành.",
      "C": "Cho rằng cô khen là chuyện đương nhiên vì mình rất giỏi.",
      "D": "Từ chối lời khen của cô vì xấu hổ."
    },
    "answer": "B",
    "explanation": "Đón nhận lời khen một cách khiêm tốn và tích cực giúp nuôi dưỡng lòng tự tin lành mạnh và hành vi tử tế lâu dài.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_14",
    "number": 14,
    "question": "Em rất thích học môn Khoa học tự nhiên nhưng các bạn bảo môn đó chỉ dành cho con trai. Em nên làm gì?",
    "options": {
      "A": "Bỏ học môn Khoa học để chuyển sang môn khác theo ý các bạn.",
      "B": "Tin vào sở thích và năng lực của mình, tiếp tục chăm học môn Khoa học để chứng minh năng lực bản thân.",
      "C": "Ghét bỏ các bạn trong lớp.",
      "D": "Khóc lóc tự trách mình có sở thích kỳ lạ."
    },
    "answer": "B",
    "explanation": "Tự tin vào bản năng và đam mê cá nhân, không để các định kiến vô căn cứ định hình sự phát triển của mình.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_15",
    "number": 15,
    "question": "Làm thế nào để cải thiện một điểm yếu của bản thân (ví dụ: rụt rè khi nói trước đám đông)?",
    "options": {
      "A": "Tránh mọi cơ hội phải phát biểu và không bao giờ đứng trước đám đông nữa.",
      "B": "Luyện tập thuyết trình trước gương hàng ngày, bắt đầu nói trước nhóm nhỏ 2-3 bạn thân, rồi nâng dần số lượng người nghe.",
      "C": "Cầu xin cô giáo không bao giờ gọi mình lên bảng.",
      "D": "Giả vờ bị đau họng mỗi khi đến giờ thuyết trình."
    },
    "answer": "B",
    "explanation": "Điểm yếu hoàn toàn có thể khắc phục được bằng các bước luyện tập nhỏ, liên tục và kiên trì dưới góc nhìn của tư duy phát triển.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_16",
    "number": 16,
    "question": "Khi được giao một nhiệm vụ mới mẻ và đầy thử thách (như tự tổ chức một trò chơi cho lớp), người tự tin sẽ nghĩ gì?",
    "options": {
      "A": "\"Việc này quá khó, mình chắc chắn sẽ làm hỏng mất\".",
      "B": "\"Đây là cơ hội tốt để mình học hỏi thêm kỹ năng mới. Mình sẽ cố gắng chuẩn bị thật tốt!\".",
      "C": "\"Mình là thiên tài nên chắc chắn không cần chuẩn bị gì cũng sẽ thành công\".",
      "D": "\"Tại sao cô giáo lại làm khó mình thế nhỉ?\"."
    },
    "answer": "B",
    "explanation": "Thái độ đón nhận thử thách như một cơ hội học tập là dấu hiệu của người tự tin có tư duy phát triển.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_17",
    "number": 17,
    "question": "Khi tự đánh giá bản thân cuối tuần, việc nào sau đây là hữu ích nhất?",
    "options": {
      "A": "Chỉ liệt kê những lỗi sai mình đã phạm phải để tự trách phạt.",
      "B": "Ghi lại những việc tốt mình đã làm được (để ghi nhận bản thân) và những việc chưa tốt cần cải thiện vào tuần tới.",
      "C": "Tự chấm cho mình điểm 10 tuyệt đối dù không học bài.",
      "D": "Không tự đánh giá vì mất thời gian chơi game."
    },
    "answer": "B",
    "explanation": "Tự đánh giá giúp học sinh nhìn nhận hành trình tiến bộ của mình một cách khách quan, ghi nhận nỗ lực bản thân và có định hướng sửa sai rõ ràng.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_18",
    "number": 18,
    "question": "Một người luôn tôn trọng bản thân sẽ ứng xử thế nào trước những lời mời rủ rê hút thuốc lá điện tử của các bạn lớn tuổi hơn?",
    "options": {
      "A": "Đồng ý thử một lần cho biết và để chứng tỏ mình \"ngầu\".",
      "B": "Kiên quyết từ chối: \"Không, tớ không dùng cái này vì nó rất có hại cho phổi của tớ\" và nhanh chóng rời đi.",
      "C": "Lấy thuốc mang về nhà giấu đi.",
      "D": "Không dám từ chối vì sợ các bạn tẩy chay."
    },
    "answer": "B",
    "explanation": "Tôn trọng bản thân đồng nghĩa với việc bảo vệ sức khỏe của mình khỏi các tác nhân độc hại và có lập trường kiên định trước áp lực bạn bè.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_19",
    "number": 19,
    "question": "Bạn thân của em vô tình làm mất chiếc bút mực yêu thích của em. Hành vi tôn trọng mối quan hệ là:",
    "options": {
      "A": "Mắng chửi bạn và đòi nghỉ chơi ngay lập tức.",
      "B": "Giữ bình tĩnh, chấp nhận lời xin lỗi của bạn và cùng bạn đi tìm lại bút, hoặc nhắc bạn lần sau chú ý giữ gìn đồ dùng của người khác hơn.",
      "C": "Tự ý lấy lại một món đồ khác của bạn để trả thù.",
      "D": "Im lặng không nói gì nhưng đi nói xấu bạn với các bạn khác trong lớp."
    },
    "answer": "B",
    "explanation": "Tôn trọng bản thân và tôn trọng mối quan hệ giúp học sinh xử lý các sự cố vô ý một cách hòa nhã, nhân văn.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_20",
    "number": 20,
    "question": "Câu nói nào sau đây thể hiện sự ghi nhận nỗ lực của bản thân một cách tích cực?",
    "options": {
      "A": "\"Hôm nay mình thật vô dụng vì chỉ làm đúng được 8/10 câu toán\".",
      "B": "\"Hôm nay mình rất tự hào vì bản thân đã kiên trì suy nghĩ để giải được bài toán khó này, dù mất nhiều thời gian hơn\".",
      "C": "\"Mình là người thông minh nhất lớp, không ai bằng mình cả\".",
      "D": "\"Học hành làm gì cho mệt, đằng nào cũng thế\"."
    },
    "answer": "B",
    "explanation": "Ghi nhận nỗ lực (process praise) giúp nuôi dưỡng động lực nội tại và tư duy phát triển bền vững hơn là chỉ tập trung vào kết quả hoàn hảo.",
    "topic": "CHỦ ĐỀ 1: TỰ NHẬN THỨC BẢN THÂN & XÂY DỰNG LÒNG TỰ TRỌNG",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_21",
    "number": 21,
    "question": "Khi em cảm thấy nhịp tim đập nhanh, đỏ mặt, tay nắm chặt lại và muốn hét thật to. Đây là những biểu hiện cơ thể của cảm xúc nào?",
    "options": {
      "A": "Cảm xúc vui mừng hân hoan.",
      "B": "Cảm xúc tức giận hoặc bực bội.",
      "C": "Cảm xúc buồn bã tủi thân.",
      "D": "Cảm xúc sợ hãi lo lắng."
    },
    "answer": "B",
    "explanation": "Cơ thể phản ứng rất rõ ràng khi tức giận (tim đập nhanh, nóng mặt, căng cơ). Nhận diện các tín hiệu này là bước đầu tiên để làm chủ cảm xúc.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_22",
    "number": 22,
    "question": "Khi có cảm xúc tức giận bột phát, hành động đầu tiên em nên làm để lấy lại bình tĩnh là gì?",
    "options": {
      "A": "Quăng ném đồ đạc xung quanh lớp học hoặc la hét thật to.",
      "B": "Nói \"Dừng lại\", tự gọi tên cảm xúc \"Mình đang tức giận\" và thực hiện kỹ thuật thở sâu bằng bụng (hít vào đếm 4, thở ra đếm 6).",
      "C": "Nhảy vào đánh nhau với người làm mình tức giận.",
      "D": "Nhịn thở hoàn toàn cho đến khi hết giận."
    },
    "answer": "B",
    "explanation": "Công thức dừng lại - gọi tên cảm xúc và thở sâu giúp đưa não bộ từ trạng thái kích động (phản ứng sinh học của hạch hạnh nhân) về trạng thái tư duy lý trí bình tĩnh.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_23",
    "number": 23,
    "question": "Em thấy một bạn trong lớp tự ý lấy bút của mình dùng mà không xin phép. Thay vì tức giận quát mắng bạn, em nên làm gì?",
    "options": {
      "A": "Đợi bạn không để ý rồi lấy trộm lại đồ của bạn.",
      "B": "Giữ bình tĩnh, nói rõ ràng bằng giọng assertive: \"Đây là bút của tớ, lần sau cậu muốn dùng thì nhớ hỏi tớ trước nhé\".",
      "C": "Im lặng chịu đựng và khóc một mình.",
      "D": "Báo ngay với cô giáo để cô phạt bạn thật nặng."
    },
    "answer": "B",
    "explanation": "Giao tiếp quyết đoán (assertive) giúp giải quyết vấn đề một cách tôn trọng hiệu quả mà không đẩy tình huống thành xung đột bạo lực.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_24",
    "number": 24,
    "question": "Khi chuẩn bị lên bảng thuyết trình trước toàn trường, em cảm thấy run rẩy, ra mồ hôi tay và rất lo lắng. Cách giải tỏa lo lắng nào sau đây là hữu ích?",
    "options": {
      "A": "Giả vờ bị ngất để không phải thuyết trình nữa.",
      "B": "Hít thở sâu, uống một vài ngụm nước ấm nhỏ và tự động viên bằng câu nói tích cực: \"Mình đã chuẩn bị kỹ rồi, mình có thể làm được!\".",
      "C": "Chạy trốn khỏi trường học ngay lập tức.",
      "D": "Uống thật nhiều nước ngọt có ga lạnh để lấy bình tĩnh."
    },
    "answer": "B",
    "explanation": "Lo lắng trước đám đông là tự nhiên. Các kỹ thuật thở sâu, bù nước ấm và tự nói chuyện tích cực (positive self-talk) giúp điều hòa nhịp tim và trấn an tinh thần hiệu quả.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_25",
    "number": 25,
    "question": "Em thấy mẹ đi làm về với khuôn mặt mệt mỏi và đóng cửa mạnh. Lựa chọn phản ứng nào thể hiện sự đồng cảm và tránh kết luận vội vàng?",
    "options": {
      "A": "Nghĩ rằng mẹ đang ghét mình và bắt đầu khóc lóc giận dỗi mẹ.",
      "B": "Nghĩ rằng chắc chắn mẹ đang tức giận việc gì đó ở cơ quan nên mệt mỏi, đi rót cho mẹ một ly nước ấm và hỏi han nhẹ nhàng: \"Hôm nay mẹ đi làm mệt lắm ạ?\".",
      "C": "Đòi mẹ phải nấu món ăn ngon cho mình ngay lập tức.",
      "D": "Đập phá đồ chơi trong phòng để mẹ chú ý đến mình."
    },
    "answer": "B",
    "explanation": "Tránh vội vã phỏng đoán tiêu cực về hành vi của người khác giúp học sinh biết đồng cảm, thấu hiểu nguyên nhân sâu xa của vấn đề và ứng xử tế nhị.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_26",
    "number": 26,
    "question": "Tại sao chúng ta không nên chia sẻ hoặc trút giận cảm xúc khó chịu lên người khác bằng cách mắng chửi hay đập phá?",
    "options": {
      "A": "Vì đập phá đồ đạc sẽ làm bố mẹ tốn tiền mua lại.",
      "B": "Vì hành vi đó không giúp giải quyết tận gốc vấn đề mà còn làm tổn thương mối quan hệ và tạo ra thêm sự tức giận xung quanh.",
      "C": "Vì mắng chửi người khác sẽ bị giáo viên hạ hạnh kiểm học tập.",
      "D": "Vì đập phá đồ đạc sẽ làm đau tay mình."
    },
    "answer": "B",
    "explanation": "Cảm xúc tức giận là bình thường, nhưng hành vi bạo lực (bằng lời nói hay chân tay) là không thể chấp nhận được. Cần tìm các kênh xả giận lành mạnh (viết, vẽ, vận động).",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_27",
    "number": 27,
    "question": "Khi em cảm thấy buồn bã vì chú mèo cưng của mình bị mất tích, cách xử lý cảm xúc nào dưới đây là tốt nhất?",
    "options": {
      "A": "Cố gắng kìm nén cảm xúc, tỏ ra vui vẻ bên ngoài và không nói chuyện với ai.",
      "B": "Cho phép bản thân khóc nếu muốn, chủ động chia sẻ nỗi buồn với bố mẹ hoặc người thân để nhận được sự ôm ấp, vỗ về.",
      "C": "Trút giận bằng cách đánh đập các động vật khác.",
      "D": "Nhốt mình trong tủ tối suốt cả ngày."
    },
    "answer": "B",
    "explanation": "Chấp nhận cảm xúc đau buồn là một phần của sự trưởng thành. Việc chia sẻ giúp xoa dịu nỗi đau tinh thần và giúp hồi phục cảm xúc nhanh hơn.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_28",
    "number": 28,
    "question": "Kỹ thuật \"Lọ cảm xúc tích cực\" giúp học sinh tự lập và quản lý tinh thần thế nào?",
    "options": {
      "A": "Dùng lọ thủy tinh đựng kẹo ngọt ăn mỗi khi buồn.",
      "B": "Viết những điều vui vẻ, những điều tốt mình đã làm hoặc được nhận mỗi ngày vào mẩu giấy nhỏ rồi bỏ vào lọ; khi buồn sẽ lấy ra đọc để tự động viên bản thân.",
      "C": "Đựng các hóa chất để xịt khử mùi phòng học.",
      "D": "Dùng lọ ném vào những bạn làm mình bực mình."
    },
    "answer": "B",
    "explanation": "Lọ tích cực là một công cụ giúp rèn luyện thói quen tập trung vào những điều tốt đẹp (lòng biết ơn), từ đó xây dựng khả năng tự phục hồi tinh thần sau những trải nghiệm tiêu cực.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_29",
    "number": 29,
    "question": "Bạn của em vô tình làm đổ nước vào cuốn vở bài tập của em. Em cảm thấy ngọn lửa tức giận bùng lên. Cách xử lý cơn giận lúc này là:",
    "options": {
      "A": "Lấy nước đổ lại vào vở của bạn để trả thù.",
      "B": "Nhắm mắt lại hít thở sâu 3 nhịp, chờ cơn giận dịu bớt rồi bảo bạn: \"Cậu chú ý hơn nhé, giờ bọn mình cùng lấy khăn giấy thấm khô vở giúp tớ\".",
      "C": "Giật vở của bạn xé nát đi.",
      "D": "Khóc lóc bắt bạn đền tiền mua vở mới ngay lập tức."
    },
    "answer": "B",
    "explanation": "Kiểm soát cơn giận giúp tránh những phản ứng bốc đồng gây hại cho tình bạn và tìm hướng giải quyết sự cố thực tế nhất.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_30",
    "number": 30,
    "question": "Đâu là một kỹ thuật thở sâu hiệu quả giúp giảm căng thẳng và lo lắng?",
    "options": {
      "A": "Hít thật nhanh và nông bằng miệng.",
      "B": "Hít vào chậm rãi bằng mũi cho bụng phình ra trong 4 giây, giữ hơi 2 giây, rồi thở ra nhẹ nhàng bằng miệng trong 6 giây cho bụng xẹp xuống.",
      "C": "Nín thở càng lâu càng tốt cho đến khi mặt đỏ gay.",
      "D": "Thở dồn dập liên tục giống như đang chạy marathon."
    },
    "answer": "B",
    "explanation": "Kỹ thuật thở cơ hoành (thở bụng) giúp kích hoạt hệ thống thần kinh phó giao cảm giúp cơ thể lập tức thư giãn, giảm nhịp tim và bình ổn huyết áp.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_31",
    "number": 31,
    "question": "Khi bước vào phòng thi, em thấy tim đập thình thịch và tay run. Em tự nhủ thầm điều gì để kiểm tra và điều chỉnh trạng thái tinh thần của mình?",
    "options": {
      "A": "\"Thôi chết rồi, mình sẽ trượt mất, mình sợ quá!\".",
      "B": "\"Tim đập nhanh là cơ thể đang bơm thêm oxy để mình tập trung làm bài tốt hơn thôi. Mình đã ôn tập rồi, hít thở sâu nào!\".",
      "C": "\"Đề thi chắc chắn sẽ toàn câu mình chưa học\".",
      "D": "\"Giá như mình giả vờ ốm để được nghỉ thi\"."
    },
    "answer": "B",
    "explanation": "Tái định khung cảm xúc (reframing) từ tiêu cực sang tích cực giúp chuyển đổi năng lượng lo âu thành sự tập trung hành động hiệu quả.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_32",
    "number": 32,
    "question": "Bố mẹ hứa cuối tuần đưa em đi công viên nước nhưng đến ngày đi thì trời mưa bão lớn nên phải hủy chuyến đi. Em cảm thấy vô cùng thất vọng. Hành vi kiểm soát cảm xúc tốt là:",
    "options": {
      "A": "Khóc lóc, đập phá đồ đạc và bỏ bữa ăn để phản đối bố mẹ.",
      "B": "Chấp nhận hoàn cảnh thời tiết khách quan, đề xuất bố mẹ cùng chơi cờ tỷ phú hoặc xem phim gia đình tại nhà, hẹn dịp khác đi công viên nước.",
      "C": "Giận dỗi bố mẹ suốt một tuần liên tục.",
      "D": "Tự ý bỏ nhà đi bộ dưới trời mưa bão cho bõ tức."
    },
    "answer": "B",
    "explanation": "Quản lý cảm xúc thất vọng đòi hỏi sự linh hoạt nhận thức (cognitive flexibility) để tìm kiếm các phương án thay thế tích cực khi kế hoạch bị thay đổi ngoài ý muốn.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_33",
    "number": 33,
    "question": "Em nghe bạn kể lại rằng: \"Bạn A nói xấu cậu là đồ lười biếng\". Hành động thông minh để tránh kết luận vội vàng là gì?",
    "options": {
      "A": "Ngay lập tức đi tìm bạn A để mắng chửi hoặc đánh nhau.",
      "B": "Đi nói xấu lại bạn A với các bạn khác trong lớp để trả đũa.",
      "C": "Giữ bình tĩnh, không vội tin lời đồn thổi gián tiếp, chủ động tìm cơ hội gặp bạn A nói chuyện riêng một cách nhẹ nhàng để làm rõ thông tin.",
      "D": "Nghỉ chơi với bạn A luôn không cần lý do."
    },
    "answer": "C",
    "explanation": "Thông tin truyền miệng qua người thứ ba thường bị tam sao thất bản. Xác minh trực tiếp bằng thái độ tôn trọng giúp tránh các hiểu lầm không đáng có.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_34",
    "number": 34,
    "question": "Khi em có một chuyện buồn rất lớn ở trường và không biết chia sẻ với ai, đâu là địa chỉ đáng tin cậy nhất?",
    "options": {
      "A": "Viết bài ẩn danh nói xấu trường lớp lên các hội nhóm mạng xã hội công cộng.",
      "B": "Chia sẻ chân thành với bố mẹ, thầy cô giáo chủ nhiệm hoặc chuyên viên tư vấn tâm lý học đường của trường.",
      "C": "Tâm sự với người lạ mặt quen trên mạng game online.",
      "D": "Giữ kín trong lòng suốt nhiều tháng liền."
    },
    "answer": "B",
    "explanation": "Người lớn có trách nhiệm và chuyên môn (cha mẹ, thầy cô, chuyên gia tâm lý) là điểm tựa an toàn nhất để giải quyết các vướng mắc tâm lý của học sinh tiểu học.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_35",
    "number": 35,
    "question": "Khi cảm thấy quá tải và căng thẳng vì có nhiều bài tập về nhà, hành động nào giúp em điều hòa tinh thần?",
    "options": {
      "A": "Vứt hết sách vở đi chơi để trốn tránh áp lực.",
      "B": "Chia nhỏ lượng bài tập, lập kế hoạch làm việc kết hợp nghỉ ngơi ngắn (ví dụ học 25 phút, nghỉ 5 phút) và nhờ bố mẹ hướng dẫn những phần quá khó.",
      "C": "Thức đêm thông chớp để làm cho xong dù đầu óc mệt mỏi.",
      "D": "Khóc lóc bắt bố mẹ làm hộ bài tập cho mình."
    },
    "answer": "B",
    "explanation": "Quản lý căng thẳng bằng cách quản lý công việc khoa học (kỹ thuật Pomodoro và chia nhỏ nhiệm vụ) giúp học sinh giải quyết vấn đề hiệu quả mà không bị áp lực đè nặng.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_36",
    "number": 36,
    "question": "Dấu hiệu nào cho thấy em đang trải qua trạng thái cảm xúc bối rối/ngượng ngùng?",
    "options": {
      "A": "Em cười lớn tiếng, chạy nhảy tung tăng khắp sân trường.",
      "B": "Mặt nóng bừng, tai đỏ lên, tránh ánh nhìn của người khác và muốn thu mình nhỏ lại.",
      "C": "Cảm thấy tràn đầy năng lượng và muốn tập thể thao.",
      "D": "Cảm thấy buồn ngủ và ngáp liên tục."
    },
    "answer": "B",
    "explanation": "Đây là phản ứng sinh lý đặc trưng của cảm xúc bối rối khi gặp các tình huống vô ý làm trò cười hoặc mắc lỗi trước đám đông.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_37",
    "number": 37,
    "question": "Cách tốt nhất để giúp một người bạn đang khóc vì làm rơi mất hộp bút màu yêu thích là gì?",
    "options": {
      "A": "Bảo bạn: \"Có cái hộp bút thôi mà cũng khóc, yếu đuối thế!\".",
      "B": "Ngồi cạnh bạn, lắng nghe bạn chia sẻ, vỗ vai an ủi và đề xuất cùng bạn đi tìm kiếm hoặc cho bạn mượn chung bút màu của mình để dùng tạm.",
      "C": "Tránh xa bạn vì thấy phiền phức.",
      "D": "Mách cô giáo là bạn đang làm ồn lớp học."
    },
    "answer": "B",
    "explanation": "Thể hiện sự đồng cảm thông qua sự lắng nghe, hiện diện và hành động giúp đỡ thiết thực là bài học quan trọng về kỹ năng quan hệ.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_38",
    "number": 38,
    "question": "Nhận định nào sau đây là SAI về cảm xúc tức giận?",
    "options": {
      "A": "Tức giận là một cảm xúc tự nhiên của con người, ai cũng có lúc tức giận.",
      "B": "Chúng ta hoàn toàn có thể học cách làm chủ cơn giận để không gây hại cho mình và người khác.",
      "C": "Tức giận là cảm xúc xấu xí, người tốt thì không bao giờ tức giận.",
      "D": "Hành vi bạo lực khi tức giận là hành vi sai trái và cần sửa đổi."
    },
    "answer": "C",
    "explanation": "Không có cảm xúc nào là \"xấu xí\" hay \"sai trái\". Tất cả cảm xúc đều có giá trị báo hiệu tình trạng của bản thân. Điểm mấu chốt là cách chúng ta lựa chọn phản ứng hành vi trước cảm xúc đó.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_39",
    "number": 39,
    "question": "Em vô tình làm hỏng món đồ chơi yêu thích của anh trai. Anh trai tức giận quát mắng em. Phản ứng nào thể hiện sự quản lý cảm xúc tốt?",
    "options": {
      "A": "Quát mắng lại anh và ném đồ chơi đó đi.",
      "B": "Nhìn nhận lỗi của mình, lắng nghe anh giận dỗi, xin lỗi anh một cách chân thành và hứa sẽ nhờ bố mẹ sửa lại hoặc bù đắp cho anh.",
      "C": "Khóc lóc lu loa lên để bố mẹ mắng anh trai.",
      "D": "Nói dối là do con mèo làm hỏng chứ không phải mình."
    },
    "answer": "B",
    "explanation": "Chịu trách nhiệm và ứng xử hòa nhã trước cơn giận của người khác khi mình làm sai giúp xoa dịu xung đột gia đình hiệu quả.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_40",
    "number": 40,
    "question": "Khi em cảm thấy vô cớ bực bội và không muốn làm gì cả, thói quen lành mạnh nào giúp em cân bằng lại năng lượng?",
    "options": {
      "A": "Xem tivi liên tục 4 tiếng đồng hồ.",
      "B": "Ăn thật nhiều kẹo ngọt và bánh gato ngọt.",
      "C": "Đi bộ ngoài trời, hít thở không khí tự nhiên, nghe nhạc nhẹ nhàng hoặc vẽ tranh tự do để giải phóng năng lượng tiêu cực.",
      "D": "Đi gây sự, trêu chọc thú cưng hoặc các bạn trong xóm."
    },
    "answer": "C",
    "explanation": "Vận động thể chất nhẹ nhàng ngoài thiên nhiên và các hoạt động sáng tạo nghệ thuật là liệu pháp tự nhiên tuyệt vời giúp tái tạo năng lượng tinh thần tích cực.",
    "topic": "CHỦ ĐỀ 2: QUẢN LÝ CẢM XÚC & LÀM CHỦ CƠN GIẬN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_41",
    "number": 41,
    "question": "Khái niệm \"Mục tiêu\" được định nghĩa dễ hiểu nhất cho học sinh tiểu học là gì?",
    "options": {
      "A": "Điểm số cao nhất mà cô giáo dành cho cả lớp.",
      "B": "Một đích đến, một kết quả cụ thể mà em mong muốn đạt được và quyết tâm thực hiện nó.",
      "C": "Những trò chơi điện tử em muốn vượt qua các màn chơi.",
      "D": "Những mong muốn viển vông không cần thực hiện."
    },
    "answer": "B",
    "explanation": "Mục tiêu là cái đích cụ thể thúc đẩy hành động nỗ lực của bản thân để đạt được kết quả mong muốn trong học tập hay cuộc sống.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_42",
    "number": 42,
    "question": "Yếu tố nào sau đây giúp một mục tiêu trở nên rõ ràng và dễ đo lường hơn?",
    "options": {
      "A": "Đặt mục tiêu thật chung chung và mơ hồ.",
      "B": "Thêm các con số cụ thể (số lượng, thời gian hoàn thành) vào mục tiêu.",
      "C": "Đặt mục tiêu quá cao so với khả năng thực tế của mình.",
      "D": "Không viết mục tiêu ra giấy, chỉ nghĩ trong đầu."
    },
    "answer": "B",
    "explanation": "Mục tiêu đo lường được (Measurable trong chuẩn SMART) cần có số liệu cụ thể. Ví dụ: Thay vì nói \"tập thể dục nhiều hơn\", hãy đặt mục tiêu \"nhảy dây 100 cái mỗi ngày vào lúc 5 giờ chiều\".",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_43",
    "number": 43,
    "question": "Đâu là một mục tiêu học tập được viết đúng cách?",
    "options": {
      "A": "\"Mình sẽ học giỏi hơn trong năm nay\".",
      "B": "\"Mình sẽ đọc hết 1 cuốn sách khoa học dài 50 trang và tóm tắt nó vào thứ Bảy tuần này\".",
      "C": "\"Mình phải làm đúng hết tất cả các bài tập trên đời\".",
      "D": "\"Không cần học bài vẫn được điểm 10\"."
    },
    "answer": "B",
    "explanation": "Mục tiêu này cụ thể (đọc sách khoa học), đo lường được (1 cuốn, 50 trang), khả thi và có thời hạn rõ ràng (thứ Bảy tuần này).",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_44",
    "number": 44,
    "question": "Khi đặt một mục tiêu lớn (như đọc hết một cuốn truyện dày 200 trang), cách thực hiện thông minh nhất là gì?",
    "options": {
      "A": "Đọc một mạch hết cả 200 trang trong một buổi tối dù đầu óc mệt mỏi.",
      "B": "Chia nhỏ mục tiêu: Mỗi ngày đọc 10 trang liên tục trong vòng 20 ngày.",
      "C": "Để cuốn truyện dưới gối ngủ để mong kiến thức tự đi vào đầu.",
      "D": "Đọc trang đầu và trang cuối rồi tự nhận là đã đọc xong."
    },
    "answer": "B",
    "explanation": "Chia nhỏ mục tiêu (chunking) giúp giảm cảm giác quá tải, tạo động lực thực hiện đều đặn hàng ngày và dễ dàng đạt được mục tiêu lớn ban đầu.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_45",
    "number": 45,
    "question": "Tiêu chí nào giúp em xác định một công việc là \"Công việc ưu tiên\" cần thực hiện trước?",
    "options": {
      "A": "Đó là những việc liên quan trực tiếp đến sức khỏe, học tập hoặc nhiệm vụ quan trọng được giao.",
      "B": "Đó là những công việc dễ làm nhất và tốn ít thời gian nhất.",
      "C": "Đó là những trò chơi điện tử đang đến giờ khuyến mãi tặng quà.",
      "D": "Đó là những việc mà các bạn trong lớp ép em phải làm hộ."
    },
    "answer": "A",
    "explanation": "Xác định thứ tự ưu tiên (prioritization) dựa trên tính chất quan trọng và khẩn cấp của công việc đối với sự phát triển bản thân và trách nhiệm cá nhân.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_46",
    "number": 46,
    "question": "Một \"Thời gian biểu\" hiệu quả cho học sinh tiểu học cần đảm bảo yếu tố nào?",
    "options": {
      "A": "Kín mít lịch học bài từ sáng đến đêm, không có thời gian nghỉ.",
      "B": "Cân bằng hợp lý giữa thời gian học tập, thời gian vui chơi giải trí, làm việc nhà giúp đỡ bố mẹ và ngủ đủ giấc.",
      "C": "Chỉ có lịch chơi game và xem tivi, không có giờ học.",
      "D": "Do bố mẹ lập hộ hoàn toàn và em không có quyền thay đổi."
    },
    "answer": "B",
    "explanation": "Thời gian biểu cần khả thi và cân bằng để học sinh vừa hoàn thành nhiệm vụ học tập vừa phát triển thể chất, kỹ năng sống thông qua vui chơi, lao động nhẹ nhàng.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_47",
    "number": 47,
    "question": "Kế hoạch 3 bước đơn giản giúp em thực hiện một công việc (ví dụ dọn dẹp bàn học) bao gồm các bước nào?",
    "options": {
      "A": "Bước 1: Khóc lóc; Bước 2: Nhờ mẹ làm hộ; Bước 3: Đi chơi.",
      "B": "Bước 1: Xác định mục tiêu dọn bàn học sạch sẽ; Bước 2: Sắp xếp các bước thực hiện cụ thể (phân loại sách, lau bàn, cất bút); Bước 3: Thực hiện và tự đánh giá kết quả.",
      "C": "Bước 1: Mua bàn học mới; Bước 2: Vứt bàn cũ đi; Bước 3: Không cần học bài nữa.",
      "D": "Bước 1: Chụp ảnh bàn học bẩn; Bước 2: Đăng lên mạng; Bước 3: Đợi người khác đến dọn hộ."
    },
    "answer": "B",
    "explanation": "Quy trình 3 bước của lập kế hoạch: Xác định mục tiêu -> Lập sơ đồ hành động chi tiết -> Thực hiện & Đánh giá giúp rèn luyện tư duy logic và tính tự lập.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_48",
    "number": 48,
    "question": "Em muốn đặt mục tiêu tập thể dục để nâng cao sức khỏe. Đâu là cách chia nhỏ mục tiêu tập luyện phù hợp cho học sinh lớp 2?",
    "options": {
      "A": "Chạy bộ liên tục 10 km ngay trong ngày đầu tiên.",
      "B": "Ngày thứ nhất tập chống đẩy 50 cái, ngày thứ hai tập gập bụng 100 cái.",
      "C": "Bắt đầu với việc đi bộ hoặc đạp xe nhẹ nhàng quanh sân nhà 15 phút mỗi chiều, rồi tăng dần thời gian tập luyện lên 20-30 phút sau mỗi tuần.",
      "D": "Nhịn ăn cơm hoàn toàn để cơ thể tự khỏe mạnh."
    },
    "answer": "C",
    "explanation": "Chia nhỏ mục tiêu vận động theo cấp độ từ dễ đến khó giúp cơ thể thích nghi dần, tránh chấn thương và duy trì thói quen tập luyện bền vững.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_49",
    "number": 49,
    "question": "Tại sao chúng ta cần phải viết kế hoạch hoặc thời gian biểu ra giấy thay vì chỉ nhớ trong đầu?",
    "options": {
      "A": "Để rèn chữ viết cho đẹp hơn.",
      "B": "Giúp não bộ không phải ghi nhớ quá tải, dễ dàng theo dõi tiến độ công việc và tạo cảm giác tự hào khi gạch đi những việc đã hoàn thành.",
      "C": "Để nộp cho cô giáo kiểm tra lấy điểm.",
      "D": "Để bố mẹ có bằng chứng phạt nếu em làm sai."
    },
    "answer": "B",
    "explanation": "Việc trực quan hóa kế hoạch ra giấy giúp tăng khả năng cam kết thực hiện và kiểm soát tiến độ công việc một cách khoa học.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_50",
    "number": 50,
    "question": "Em lập kế hoạch học tập cho buổi tối nhưng bạn hàng xóm rủ sang chơi game đúng giờ học bài. Hành động đúng đắn là:",
    "options": {
      "A": "Bỏ học bài sang chơi game luôn vì chơi game vui hơn.",
      "B": "Kiên từ chối bạn: \"Bây giờ là giờ học bài theo thời gian biểu của tớ rồi. Hẹn cậu chiều mai bọn mình cùng chơi nhé\".",
      "C": "Vừa mang sách vở sang nhà bạn vừa chơi game cùng bạn.",
      "D": "Nói dối bố mẹ là đi học nhóm rồi sang chơi game."
    },
    "answer": "B",
    "explanation": "Tôn trọng thời gian biểu cá nhân thể hiện sự tự kỷ luật và khả năng quản lý bản thân tốt trước các tác nhân gây nhiễu bên ngoài.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_51",
    "number": 51,
    "question": "Yếu tố nào sau đây KHÔNG phải là một phần của mục tiêu hiệu quả theo chuẩn SMART?",
    "options": {
      "A": "Tính cụ thể (Specific).",
      "B": "Đo lường được (Measurable).",
      "C": "Tính bất khả thi, siêu thực (Unrealistic).",
      "D": "Có thời hạn hoàn thành (Time-bound)."
    },
    "answer": "C",
    "explanation": "Một mục tiêu tốt phải khả thi (Achievable) và thực tế (Realistic) chứ không được quá xa vời vượt quá năng lực hiện tại của học sinh.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_52",
    "number": 52,
    "question": "Để thực hiện mục tiêu \"Tự dọn dẹp phòng ngủ của mình sạch đẹp\", bước lập hành động nào dưới đây là cụ thể nhất?",
    "options": {
      "A": "\"Mình sẽ làm cho căn phòng trở nên thật lung linh\".",
      "B": "\"Sắp xếp lại gối mền gọn gàng trên giường -> Cất đồ chơi vào thùng -> Lau bụi mặt bàn học -> Quét nhà\".",
      "C": "\"Nhờ chị gái dọn hộ ngăn tủ quần áo\".",
      "D": "\"Mua thật nhiều hoa về cắm trong phòng\"."
    },
    "answer": "B",
    "explanation": "Các bước hành động cụ thể giúp học sinh hình dung rõ ràng công việc cần làm, từ đó dễ dàng bắt tay vào thực hiện thay vì bối rối không biết bắt đầu từ đâu.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_53",
    "number": 53,
    "question": "Khi đánh giá một bản kế hoạch học tập cá nhân, tiêu chí nào cho thấy đó là một bản kế hoạch tốt?",
    "options": {
      "A": "Số lượng công việc dày đặc, không có thời gian trống nghỉ ngơi.",
      "B": "Kế hoạch quá đơn giản, chỉ ghi \"Học bài\".",
      "C": "Thứ tự công việc hợp lý, phân bổ thời gian rõ ràng, khả thi và có ghi chú phương án dự phòng.",
      "D": "Kế hoạch được trang trí nhiều hình vẽ sticker bắt mắt nhất."
    },
    "answer": "C",
    "explanation": "Bản kế hoạch tốt cần có cấu trúc khoa học, thực tế thực hiện được và có sự linh hoạt điều chỉnh khi có tình huống phát sinh.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_54",
    "number": 54,
    "question": "Em đặt mục tiêu \"Đạt điểm 10 môn Toán trong kỳ thi học kỳ tới\". Đâu là hành động hỗ trợ thực tế nhất cho mục tiêu này?",
    "options": {
      "A": "Mua một bộ quần áo mới để mặc đi thi cho may mắn.",
      "B": "Dành 30 phút mỗi tối để làm thêm 3 bài tập toán nâng cao và nhờ thầy cô giải đáp những phần chưa hiểu.",
      "C": "Cầu nguyện mỗi ngày mà không mở sách vở ra ôn tập.",
      "D": "Nhờ bạn giỏi toán nhất lớp cho chép bài trong phòng thi."
    },
    "answer": "B",
    "explanation": "Mục tiêu cần đi kèm với kế hoạch hành động thực tế (action plan) và nỗ lực rèn luyện hàng ngày mới có thể đạt được kết quả mong muốn.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_55",
    "number": 55,
    "question": "Sau khi kết thúc thời gian thực hiện mục tiêu nhưng kết quả đạt được không như ý muốn, em nên làm gì?",
    "options": {
      "A": "Vứt bản kế hoạch đi và không bao giờ đặt mục tiêu nữa.",
      "B": "Suy ngẫm xem nguyên nhân do đâu (kế hoạch chưa hợp lý, lười biếng hay gặp khó khăn khách quan), điều chỉnh lại kế hoạch và kiên trì thử lại.",
      "C": "Đổ lỗi cho thời tiết hoặc sự thiếu may mắn của bản thân.",
      "D": "Tự trách mình kém cỏi và khóc lóc giận dỗi."
    },
    "answer": "B",
    "explanation": "Đánh giá và điều chỉnh sau thất bại là kỹ năng cốt lõi của tư duy phát triển, giúp học sinh rút kinh nghiệm sâu sắc để tiến bộ trong lần sau.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_56",
    "number": 56,
    "question": "Em muốn lập thời gian biểu cho ngày Chủ Nhật. Việc nào nên được xếp vào nhóm \"Công việc ưu tiên hàng đầu\"?",
    "options": {
      "A": "Chơi game online cùng các bạn cùng lớp.",
      "B": "Đi xem phim hoạt hình ngoài rạp.",
      "C": "Hoàn thành bài tập chuẩn bị cho buổi học thứ Hai tuần tới và dọn dẹp bàn học cá nhân.",
      "D": "Lướt xem các video ngắn trên Youtube."
    },
    "answer": "C",
    "explanation": "Hoàn thành nhiệm vụ học tập và tự lập dọn dẹp không gian cá nhân là trách nhiệm chính của học sinh cần được ưu tiên hoàn thành trước khi vui chơi giải trí.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_57",
    "number": 57,
    "question": "Trong các bước lập kế hoạch làm một chiếc lồng đèn trung thu bằng giấy, bước nào thuộc giai đoạn \"Lên hành động\"?",
    "options": {
      "A": "Mong muốn có một chiếc lồng đèn thật đẹp để đi rước đèn.",
      "B": "Chuẩn bị giấy màu, kéo, keo dán; vẽ phác thảo hình dáng lồng đèn và cắt dán ráp các chi tiết theo trình tự.",
      "C": "Đốt nến xem đèn có sáng không.",
      "D": "Đi khoe đèn với các bạn hàng xóm."
    },
    "answer": "B",
    "explanation": "Giai đoạn lên hành động bao gồm việc chuẩn bị nguyên vật liệu và thực hiện các bước kỹ thuật cụ thể để tạo ra sản phẩm.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_58",
    "number": 58,
    "question": "Tại sao việc đặt mục tiêu \"vừa sức\" lại quan trọng đối với học sinh tiểu học?",
    "options": {
      "A": "Để không phải nỗ lực cố gắng học hành làm gì.",
      "B": "Giúp học sinh duy trì được động lực, không bị nản lòng do mục tiêu quá khó, đồng thời cũng không bị nhàm chán do mục tiêu quá dễ.",
      "C": "Để lúc nào cũng đạt điểm tối đa một cách dễ dàng.",
      "D": "Đặt mục tiêu vừa sức để bố mẹ không kỳ vọng nhiều."
    },
    "answer": "B",
    "explanation": "Mục tiêu quá cao dễ gây nản lòng (stress vùng hoảng sợ), mục tiêu quá thấp gây nhàm chán (vùng an toàn). Mục tiêu vừa sức nằm ở vùng phát triển (stretch zone) thúc đẩy sự tiến bộ tốt nhất.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_59",
    "number": 59,
    "question": "Em ghi vào thời gian biểu: \"8h00 - 9h00 tối: Học bài\". Đến 8h30 tối, em thấy mình đã làm xong hết bài tập. Em nên làm gì trong thời gian còn lại?",
    "options": {
      "A": "Bật tivi xem hoạt hình luôn dù chưa hết giờ quy định.",
      "B": "Đọc trước bài mới của ngày mai hoặc đọc một vài trang sách khoa học yêu thích cho đến hết giờ, sau đó mới đi chơi.",
      "C": "Ngồi chơi điện tử âm thầm để bố mẹ tưởng vẫn đang học.",
      "D": "Đi ngủ luôn mặc dù chưa buồn ngủ."
    },
    "answer": "B",
    "explanation": "Sử dụng thời gian học tập còn dư hiệu quả để mở rộng kiến thức giúp hình thành thói quen chủ động học tập và tự kỷ luật cao.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_60",
    "number": 60,
    "question": "Ai là người có vai trò chính trong việc thực hiện mục tiêu cá nhân của em?",
    "options": {
      "A": "Bố mẹ em - vì bố mẹ phải đôn đốc em mỗi ngày.",
      "B": "Cô giáo chủ nhiệm - vì cô giáo chấm điểm cho em.",
      "C": "Chính bản thân em - vì chỉ có sự tự giác và nỗ lực của chính em mới quyết định kết quả đạt được mục tiêu.",
      "D": "Bạn thân của em - vì bạn học cùng em."
    },
    "answer": "C",
    "explanation": "Tự chịu trách nhiệm về hành trình thực hiện mục tiêu của mình là biểu hiện cao nhất của tính tự lập và làm chủ bản thân.",
    "topic": "CHỦ ĐỀ 3: KỸ NĂNG ĐẶT MỤC TIÊU & LẬP KẾ HOẠCH CÁ NHÂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_61",
    "number": 61,
    "question": "Phương pháp quản lý thời gian Pomodoro (quả cà chua) hướng dẫn học sinh học tập như thế nào?",
    "options": {
      "A": "Vừa học bài vừa ăn cà rốt để bổ mắt.",
      "B": "Tập trung học hoàn toàn trong 25 phút, sau đó nghỉ ngơi thư giãn ngắn 5 phút, rồi lặp lại chu kỳ.",
      "C": "Học liên tục suốt 4 tiếng không nghỉ ngơi để đạt hiệu quả cao nhất.",
      "D": "Dành 5 phút học bài và 25 phút chơi game giải trí."
    },
    "answer": "B",
    "explanation": "Phương pháp Pomodoro giúp duy trì sự tập trung tối đa của não bộ trong khoảng thời gian ngắn (25 phút) và ngăn ngừa mệt mỏi nhờ các khoảng nghỉ ngơi ngắn (5 phút).",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_62",
    "number": 62,
    "question": "Phương pháp quản lý thời gian M.I.T (Most Important Tasks) khuyên chúng ta nên làm gì vào đầu mỗi ngày?",
    "options": {
      "A": "Xác định và tập trung hoàn thành 3 công việc quan trọng nhất trong ngày trước khi làm những việc khác.",
      "B": "Làm thật nhiều việc vặt cùng một lúc để tiết kiệm thời gian.",
      "C": "Đi chơi thật thoải mái vào buổi sáng và để bài tập đến đêm muộn mới làm.",
      "D": "Nhờ người khác làm hộ toàn bộ công việc quan trọng của mình."
    },
    "answer": "A",
    "explanation": "M.I.T tập trung năng lượng vào những việc có giá trị cao nhất trong ngày, tránh việc xao nhãng vào các nhiệm vụ phụ không quan trọng.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_63",
    "number": 63,
    "question": "Theo ma trận quản lý thời gian Eisenhower, những công việc thuộc nhóm \"Khẩn cấp và Quan trọng\" (ví dụ: ngày mai thi học kỳ mà chưa ôn bài) cần được xử lý như thế nào?",
    "options": {
      "A": "Trì hoãn lại đợi đến sáng mai đi thi rồi tính.",
      "B": "Ủy quyền nhờ bạn học giỏi ôn thi hộ.",
      "C": "Làm ngay lập tức và tập trung toàn bộ năng lượng để hoàn thành.",
      "D": "Xóa bỏ công việc này khỏi danh sách kế hoạch vì quá áp lực."
    },
    "answer": "C",
    "explanation": "Nhóm việc Khẩn cấp & Quan trọng yêu cầu hành động ngay lập tức vì hậu quả của việc không hoàn thành là rất lớn và xảy ra ngay lập tức.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_64",
    "number": 64,
    "question": "Thế nào là sự \"Cân bằng giữa học tập và vui chơi giải trí\"?",
    "options": {
      "A": "Dành 90% thời gian chơi game và 10% thời gian liếc nhìn sách vở.",
      "B": "Hoàn thành đầy đủ bài tập và nhiệm vụ học tập theo kế hoạch, sau đó dành thời gian chơi thể thao, vẽ tranh hoặc giải trí lành mạnh mà không cảm thấy lo lắng hay tội lỗi.",
      "C": "Chỉ học tập suốt ngày đêm, không chơi thể thao hay nói chuyện với bạn bè để đạt điểm tuyệt đối.",
      "D": "Bỏ học hoàn toàn để đi chơi thể thao cho khỏe mạnh."
    },
    "answer": "B",
    "explanation": "Cân bằng giúp học sinh phát triển toàn diện cả trí tuệ lẫn thể chất và duy trì sức khỏe tinh thần lành mạnh, vui tươi.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_65",
    "number": 65,
    "question": "Em đang làm bài tập toán về nhà thì điện thoại của mẹ cạnh bên reo chuông báo có tin nhắn video mới của kênh giải trí yêu thích. Hành vi quản lý thời gian tốt là:",
    "options": {
      "A": "Dừng ngay việc làm bài tập để mở điện thoại xem video.",
      "B": "Úp điện thoại xuống hoặc để xa tầm mắt, tập trung làm xong bài tập toán rồi mới xin phép mẹ xem video giải trí trong giờ nghỉ.",
      "C": "Vừa làm bài tập vừa xem video cùng lúc để tiết kiệm thời gian.",
      "D": "Khóc lóc bắt mẹ cất điện thoại đi chỗ khác."
    },
    "answer": "B",
    "explanation": "Loại bỏ các tác nhân gây mất tập trung (distractions) là điều kiện cần thiết để thực hành quản lý thời gian và nâng cao hiệu suất học tập.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_66",
    "number": 66,
    "question": "Tại sao việc lập danh sách việc cần làm (To-Do List) hàng ngày lại giúp ích cho việc quản lý thời gian?",
    "options": {
      "A": "Để nộp cho bố mẹ xem mỗi buổi tối.",
      "B": "Giúp em biết rõ mình cần làm những việc gì, tránh bỏ sót công việc và biết cách sắp xếp thời gian làm việc hợp lý.",
      "C": "Để so sánh xem mình có nhiều việc hơn bạn bên cạnh không.",
      "D": "Viết danh sách ra giấy để tập viết chữ đẹp."
    },
    "answer": "B",
    "explanation": "To-Do List trực quan hóa các nhiệm vụ, giúp giải phóng bộ nhớ của não bộ và định hình rõ ràng lộ trình hoạt động trong ngày.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_67",
    "number": 67,
    "question": "Công việc nào sau đây thuộc nhóm \"Quan trọng nhưng Không khẩn cấp\" (cần lên kế hoạch thực hiện đều đặn để tránh bị dồn ứ)?",
    "options": {
      "A": "Chữa cháy một đám cháy nhỏ ở bếp.",
      "B": "Việc tự học tiếng Anh 15 từ vựng mỗi ngày để chuẩn bị cho kỳ thi học sinh giỏi vào cuối năm.",
      "C": "Trả lời cuộc điện thoại rủ đi chơi game ngay lập tức của bạn.",
      "D": "Đi dọn dẹp đống đổ vỡ do mình vừa vô ý làm rơi."
    },
    "answer": "B",
    "explanation": "Nhóm việc Quan trọng nhưng Không khẩn cấp là chìa khóa của sự phát triển lâu dài. Nếu không chủ động lập kế hoạch làm hàng ngày, chúng sẽ biến thành việc Khẩn cấp và gây áp lực rất lớn khi đến hạn chót.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_68",
    "number": 68,
    "question": "Em có 2 việc cần làm trong tối nay: Ôn tập bài kiểm tra Toán ngày mai (mất 1 tiếng) và Vẽ một bức tranh tự do nộp sau 1 tuần nữa (mất 1 tiếng). Em nên sắp xếp thứ tự ưu tiên thế nào?",
    "options": {
      "A": "Vẽ tranh trước vì em thích vẽ tranh hơn.",
      "B": "Ôn thi Toán trước vì đây là việc Khẩn cấp và Quan trọng; vẽ tranh sẽ lên lịch làm vào các tối tiếp theo.",
      "C": "Vừa cầm bút vẽ vừa nhẩm công thức toán cùng lúc.",
      "D": "Không làm việc nào cả, đi ngủ sớm."
    },
    "answer": "B",
    "explanation": "Thứ tự ưu tiên cần dựa trên thời hạn hoàn thành (deadline) và tầm quan trọng của kết quả công việc đối với nhiệm vụ học tập.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_69",
    "number": 69,
    "question": "Trì hoãn (procrastination) là thói quen xấu trong quản lý thời gian. Đâu là biểu hiện của sự trì hoãn?",
    "options": {
      "A": "Bắt tay vào làm bài tập ngay khi ngồi vào bàn học.",
      "B": "Tự nhủ \"để lát nữa làm\", \"mai làm cũng kịp\" rồi đi xem tivi mặc dù bài tập đang rất nhiều.",
      "C": "Lập thời gian biểu chi tiết cho tuần mới.",
      "D": "Nhờ bạn hướng dẫn câu hỏi khó để làm cho nhanh."
    },
    "answer": "B",
    "explanation": "Trì hoãn là việc tự ý lùi thời gian thực hiện công việc quan trọng để làm những việc giải trí dễ dàng hơn, dẫn đến dồn ứ công việc và căng thẳng phút chót.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_70",
    "number": 70,
    "question": "Trong khi áp dụng phương pháp Pomodoro, trong thời gian nghỉ ngắn 5 phút giữa các phiên học, em nên làm việc nào?",
    "options": {
      "A": "Mở game điện thoại ra chơi một ván ngắn.",
      "B": "Đứng dậy vươn vai, uống một ngụm nước lọc, nhắm mắt thư giãn hoặc nhìn ra xa để thả lỏng cơ thể và mắt.",
      "C": "Đọc tiếp bài học nâng cao của môn khác.",
      "D": "Ăn một bữa ăn thật no với cơm và thịt gà."
    },
    "answer": "B",
    "explanation": "Thời gian nghỉ ngắn là để não bộ hoàn toàn thư giãn và tái tạo năng lượng tập trung cho phiên Pomodoro tiếp theo, tránh các kích thích mạnh từ thiết bị điện tử.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_71",
    "number": 71,
    "question": "Điều gì xảy ra nếu em không biết sắp xếp thứ tự công việc ưu tiên trong ngày?",
    "options": {
      "A": "Em sẽ hoàn thành tất cả mọi việc một cách hoàn hảo.",
      "B": "Em dễ bị rối loạn, tốn thời gian vào những việc vô bổ, bỏ sót việc quan trọng và luôn cảm thấy căng thẳng vì thiếu thời gian.",
      "C": "Em sẽ có nhiều thời gian chơi game hơn.",
      "D": "Bố mẹ sẽ tự động làm hết mọi việc thay cho em."
    },
    "answer": "B",
    "explanation": "Thiếu thứ tự ưu tiên dẫn đến việc quản lý thời gian hỗn loạn, lãng phí năng lượng vào việc không quan trọng và không đạt được kết quả mong muốn.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_72",
    "number": 72,
    "question": "Em muốn hoàn thành bài tập dự án nhóm vào tối nay nhưng máy tính của em đột ngột bị mất kết nối internet. Cách xử lý thời gian linh hoạt là gì?",
    "options": {
      "A": "Bực bội đập phá bàn ghế rồi đi ngủ luôn.",
      "B": "Sử dụng thời gian đó để hoàn thành các phần việc không cần internet (như viết dàn ý ra giấy, vẽ tay các sơ đồ), rồi nhờ bố mẹ hỗ trợ kết nối mạng sau.",
      "C": "Đợi đến khi có mạng internet trở lại mới làm, dù là nửa đêm.",
      "D": "Gọi điện mắng các thành viên khác trong nhóm vì máy tính hỏng."
    },
    "answer": "B",
    "explanation": "Quản lý thời gian chủ động đòi hỏi khả năng thích ứng linh hoạt trước sự cố khách quan để tối ưu hóa quỹ thời gian hiện có.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_73",
    "number": 73,
    "question": "Đâu là một thói quen giúp tiết kiệm thời gian chuẩn bị đi học vào buổi sáng?",
    "options": {
      "A": "Để sáng mai ngủ dậy mới lục tung nhà tìm cặp sách và quần áo đồng phục.",
      "B": "Soạn sẵn sách vở theo thời khóa biểu, chuẩn bị quần áo đồng phục phẳng phiu và xếp gọn vào balo từ tối hôm trước.",
      "C": "Bỏ qua việc đánh răng rửa mặt buổi sáng để đi học cho nhanh.",
      "D": "Nhờ bố mẹ mặc quần áo và đeo balo hộ."
    },
    "answer": "B",
    "explanation": "Chuẩn bị trước từ tối hôm trước (night routine) giúp buổi sáng thức dậy diễn ra thong thả, tránh cuống cuồng đi học muộn và quên đồ dùng.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_74",
    "number": 74,
    "question": "Khi thực hiện kế hoạch, em nhận ra mình mất quá nhiều thời gian cho một bài toán khó và không còn đủ thời gian cho các môn khác. Em nên điều chỉnh thế nào?",
    "options": {
      "A": "Bỏ qua bài toán đó, đánh dấu lại để nhờ thầy cô hướng dẫn sau và chuyển sang làm các bài tập khác để đảm bảo tiến độ kế hoạch.",
      "B": "Cố ngồi suy nghĩ bài toán đó suốt đêm cho đến khi giải ra mới thôi.",
      "C": "Xé bài tập toán đi vì quá khó.",
      "D": "Chép bài giải của bạn khác cho nhanh."
    },
    "answer": "A",
    "explanation": "Biết phân bổ thời gian hợp lý và không bị \"kẹt\" lại quá lâu ở một nhiệm vụ khó giúp học sinh quản lý tổng thể kế hoạch học tập hiệu quả.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_75",
    "number": 75,
    "question": "Thói quen nào sau đây giúp em tập trung cao độ khi ngồi vào bàn học bài?",
    "options": {
      "A": "Bật tivi ca nhạc âm lượng lớn bên cạnh để học cho vui.",
      "B": "Bày thật nhiều đồ chơi, truyện tranh xung quanh bàn học.",
      "C": "Chuẩn bị không gian học tập yên tĩnh, đủ ánh sáng, dọn sạch đồ chơi khỏi bàn học và tắt các thiết bị thông báo.",
      "D": "Vừa học vừa nằm trên giường trùm chăn ấm."
    },
    "answer": "C",
    "explanation": "Môi trường học tập lý tưởng (học tập tối giản) giúp giảm thiểu các kích thích gây phân tán tư duy, giúp học sinh nhanh chóng đi vào trạng thái tập trung sâu.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_76",
    "number": 76,
    "question": "Em muốn rèn luyện kỹ năng đọc lướt sách để tiết kiệm thời gian tìm kiếm thông tin. Cách đọc lướt đúng là gì?",
    "options": {
      "A": "Đọc từng từ một từ đầu đến cuối cuốn sách thật chậm.",
      "B": "Đọc phần mục lục, các tiêu đề lớn, tiêu đề nhỏ, các từ in đậm và các hình ảnh minh họa để nắm được cấu trúc nội dung chính trước khi đọc chi tiết.",
      "C": "Chỉ đọc trang đầu tiên và trang cuối cùng của sách.",
      "D": "Nhắm mắt lật trang sách thật nhanh và đoán mò nội dung."
    },
    "answer": "B",
    "explanation": "Đọc lướt (skimming) giúp định vị thông tin nhanh chóng, tiết kiệm thời gian đọc và giúp hiểu được bức tranh tổng quan của tài liệu.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_77",
    "number": 77,
    "question": "Tại sao việc ngủ đủ giấc (8-9 tiếng mỗi đêm) lại liên quan mật thiết đến việc quản lý thời gian hiệu quả vào ngày hôm sau?",
    "options": {
      "A": "Vì ngủ nhiều giúp em có thêm thời gian nằm mơ thấy kế hoạch.",
      "B": "Vì ngủ đủ giấc giúp não bộ tỉnh táo, tăng khả năng tập trung, ghi nhớ tốt và làm việc nhanh hơn gấp nhiều lần so với khi cơ thể mệt mỏi buồn ngủ.",
      "C": "Vì ngủ nhiều giúp cơ thể to lớn hơn để làm việc nặng.",
      "D": "Không liên quan gì, ngủ ít mới có nhiều thời gian để làm việc."
    },
    "answer": "B",
    "explanation": "Sức khỏe thể chất là nền tảng của năng suất làm việc. Đầu tư thời gian cho giấc ngủ sâu chất lượng giúp tăng hiệu quả sử dụng thời gian thức hôm sau.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_78",
    "number": 78,
    "question": "Em lập kế hoạch tự học tiếng Anh trong 30 phút. Hành động nào thể hiện em đang kiểm soát thời gian tốt?",
    "options": {
      "A": "Cứ 5 phút lại ngó đồng hồ xem đã hết giờ chưa.",
      "B": "Đặt đồng hồ hẹn giờ đúng 30 phút, tập trung hoàn thành bài học và tắt chuông báo khi hết giờ để đánh giá kết quả.",
      "C": "Học được 10 phút thì chuyển sang chơi game 20 phút.",
      "D": "Học bài quá giờ quy định 3 tiếng liên tục không nghỉ."
    },
    "answer": "B",
    "explanation": "Sử dụng đồng hồ hẹn giờ (timer) giúp học sinh cam kết thời gian học tập tập trung mà không phải bận tâm canh cánh nhìn giờ liên tục.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_79",
    "number": 79,
    "question": "Đâu là một kẻ cắp thời gian (time-waster) phổ biến nhất mà học sinh tiểu học cần nhận biết và hạn chế?",
    "options": {
      "A": "Việc tự đọc sách khoa học tự nhiên.",
      "B": "Việc giúp mẹ dọn dẹp bàn ăn sau khi ăn xong.",
      "C": "Việc lướt xem các video ngắn giải trí vô bổ liên tục trên mạng xã hội mà không kiểm soát thời gian.",
      "D": "Việc tham gia câu lạc bộ bóng rổ của trường."
    },
    "answer": "C",
    "explanation": "Các thuật toán mạng xã hội thiết kế để giữ chân người dùng. Việc xem vô điều kiện không hẹn giờ dễ làm tiêu hao quỹ thời gian dành cho học tập, vận động và gia đình.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_80",
    "number": 80,
    "question": "Khi em hoàn thành xuất sắc tất cả các công việc trong ngày trước thời gian dự kiến, em nên làm gì?",
    "options": {
      "A": "Tự thưởng cho mình một khoảng thời gian nghỉ ngơi, chơi thể thao hoặc làm việc mình thích, ghi nhận nỗ lực của bản thân để tạo động lực cho ngày mai.",
      "B": "Tự trách mình vì đã không lập thêm nhiều việc nặng hơn để làm tiếp.",
      "C": "Đi tìm các bạn để khoe khoang và chê bai các bạn làm chậm.",
      "D": "Xóa thời gian biểu của ngày mai đi vì nghĩ mình đã quá giỏi."
    },
    "answer": "A",
    "explanation": "Ghi nhận và tự thưởng lành mạnh sau khi hoàn thành kế hoạch giúp củng cố thói quen quản lý thời gian tích cực lâu dài thông qua cơ chế giải phóng dopamine tự nhiên của não bộ.",
    "topic": "CHỦ ĐỀ 4: KỸ NĂNG QUẢN LÝ THỜI GIAN HIỆU QUẢ",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_81",
    "number": 81,
    "question": "Em tham gia một trận đấu cờ vua ở trường và bị thua ngay từ vòng đầu tiên. Suy nghĩ nào thể hiện tư duy phát triển?",
    "options": {
      "A": "\"Mình thật là kém cỏi, mình sẽ không bao giờ chơi cờ vua nữa\".",
      "B": "\"Đối thủ đã chơi rất tốt! Mình sẽ xem lại biên bản ván đấu để tìm ra nước đi sai của mình và tập luyện nhiều hơn để tiến bộ lần sau\".",
      "C": "\"Trọng tài đã thiên vị đối thủ nên mình mới thua\".",
      "D": "\"Chơi cờ vua thật là ngớ ngẩn, không đáng để mình quan tâm\"."
    },
    "answer": "B",
    "explanation": "Người có tư duy phát triển (growth mindset) coi thất bại là cơ hội học hỏi và phản hồi thông tin để cải thiện kỹ năng, chứ không định nghĩa giá trị con người họ.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_82",
    "number": 82,
    "question": "Trong một trò chơi tập thể ở lớp, đội của em bị thua cuộc. Hành vi ứng xử văn minh là gì?",
    "options": {
      "A": "Mắng mỏ, đổ lỗi cho các thành viên khác trong đội chơi kém.",
      "B": "Giữ bình tĩnh, chúc mừng đội chiến thắng bằng sự tôn trọng và cùng cả đội rút kinh nghiệm để chơi tốt hơn lần sau.",
      "C": "Khóc lóc ăn vạ bắt ban tổ chức phải cho đấu lại.",
      "D": "Tức giận bỏ về giữa chừng và xé rách cờ của đội bạn."
    },
    "answer": "B",
    "explanation": "Tinh thần thể thao (sportsmanship) và kiểm soát cảm xúc khi thua cuộc giúp xây dựng nhân cách chính trực và gìn giữ mối quan hệ bạn bè bền vững.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_83",
    "number": 83,
    "question": "Theo góc nhìn của Tư duy phát triển (Growth Mindset), trí thông minh và tài năng của con người phát triển từ đâu?",
    "options": {
      "A": "Là do di truyền bẩm sinh, sinh ra thế nào thì mãi mãi như thế, không thay đổi được.",
      "B": "Được phát triển thông qua sự nỗ lực rèn luyện, học hỏi từ sai lầm và phương pháp học tập đúng đắn.",
      "C": "Nhờ vào sự may mắn và số phận định sẵn.",
      "D": "Chỉ có được khi được người khác khen ngợi nhiều."
    },
    "answer": "B",
    "explanation": "Tư duy phát triển tin rằng bộ não giống như một khối cơ bắp, càng rèn luyện và thử thách với những bài tập khó thì càng trở nên thông minh và nhạy bén hơn.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_84",
    "number": 84,
    "question": "Em tập đi xe đạp hai bánh lần đầu tiên và bị ngã đau nhiều lần. Lựa chọn hành động đúng đắn là:",
    "options": {
      "A": "Vứt xe đạp vào kho và kiên quyết không bao giờ tập đi xe nữa.",
      "B": "Nhờ bố mẹ đỡ phía sau, điều chỉnh thăng bằng từ từ, kiên trì tập luyện mỗi ngày một ít cho đến khi tự đi được.",
      "C": "Bắt đền bố mẹ vì mua chiếc xe làm mình ngã đau.",
      "D": "Ngồi cạnh xe đạp khóc lóc cầu xin xe tự chạy được."
    },
    "answer": "B",
    "explanation": "Sự kiên trì (grit) trước những khó khăn vật lý ban đầu là chìa khóa để làm chủ bất kỳ kỹ năng vận động hay trí tuệ nào.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_85",
    "number": 85,
    "question": "Khi gặp một bài toán nâng cao rất khó và làm sai nhiều lần, người có tư duy cố định (Fixed Mindset) thường sẽ nghĩ gì?",
    "options": {
      "A": "\"Mình chưa giải được bài này vì mình chưa tìm ra phương pháp đúng. Mình sẽ thử cách khác!\".",
      "B": "\"Bài này chứng tỏ mình không có năng khiếu học Toán. Mình nên bỏ cuộc thôi\".",
      "C": "\"Mình thích bài toán này vì nó thử thách bộ não của mình\".",
      "D": "\"Mình sẽ nhờ bạn giải thích hộ để mình hiểu cách làm\"."
    },
    "answer": "B",
    "explanation": "Tư duy cố định tin rằng năng lực là bất biến. Khi gặp thất bại hoặc khó khăn, họ nhanh chóng kết luận mình không có khả năng và lựa chọn bỏ cuộc để tránh né cảm giác thất bại.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_86",
    "number": 86,
    "question": "Câu hỏi cốt lõi nào em nên tự hỏi bản thân sau mỗi lần làm sai hoặc thất bại để học hỏi và tiến bộ?",
    "options": {
      "A": "\"Tại sao số mình lại đen đủi thế này?\".",
      "B": "\"Bài học mình rút ra từ việc này là gì? Làm thế nào để lần sau mình làm tốt hơn?\".",
      "C": "\"Ai là người chịu trách nhiệm cho lỗi sai này thay mình?\".",
      "D": "\"Làm sao để giấu kín chuyện này không cho ai biết?\"."
    },
    "answer": "B",
    "explanation": "Đây là câu hỏi định hướng giải pháp (solution-oriented question) giúp chuyển tư duy từ trạng thái tự trách sang trạng thái phân tích học tập tích cực.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_87",
    "number": 87,
    "question": "Em được chọn vào đội tuyển bóng đá của trường nhưng trong trận đấu chính thức em đã sút hỏng quả phạt đền quyết định dẫn đến đội nhà bị loại. Em cảm thấy vô cùng đau khổ. Cách tự động viên bản thân vượt qua là:",
    "options": {
      "A": "Nghỉ tập bóng đá vĩnh viễn vì thấy xấu hổ với đồng đội.",
      "B": "Tự trách mình là kẻ phá hoại đội bóng.",
      "C": "Hiểu rằng ngay cả các cầu thủ siêu sao thế giới cũng có lúc sút hỏng phạt đền, đón nhận sự an ủi của đồng đội và tích cực tập sút phạt đền nhiều hơn trên sân tập.",
      "D": "Đổ lỗi cho chất lượng quả bóng quá kém."
    },
    "answer": "C",
    "explanation": "Chấp nhận sai lầm như một phần tất yếu của thể thao và cuộc sống giúp học sinh xây dựng khả năng phục hồi tâm lý (resilience) mạnh mẽ.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_88",
    "number": 88,
    "question": "Từ \"CHƯA\" (YET) trong tư duy phát triển có ý nghĩa thế nào?",
    "options": {
      "A": "Nghĩa là việc đó hoàn toàn không thể làm được.",
      "B": "Nghĩa là hiện tại em chưa làm được việc đó, nhưng thông qua học hỏi và rèn luyện, em sẽ làm được trong tương lai.",
      "C": "Nghĩa là em không cần phải làm việc đó nữa.",
      "D": "Là một từ nói để trốn tránh trách nhiệm làm bài tập."
    },
    "answer": "B",
    "explanation": "\"Sức mạnh của từ Chưa\" (The power of YET) giúp thay đổi nhận thức từ bế tắc (\"Tôi không biết làm\") sang hướng mở phát triển (\"Tôi chưa biết làm - nghĩa là tôi sẽ học để biết\").",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_89",
    "number": 89,
    "question": "Một bạn trong lớp thường xuyên chế giễu bài vẽ của em là xấu xí. Cách phản ứng thể hiện sự vững vàng tâm lý là gì?",
    "options": {
      "A": "Đánh bạn để dạy cho bạn một bài học.",
      "B": "Im lặng khóc lóc và xé bức tranh đi.",
      "C": "Bình tĩnh nói: \"Đây là phong cách vẽ của tớ, tớ đang luyện tập để vẽ đẹp hơn. Cảm ơn ý kiến của cậu\" và tiếp tục vẽ bức tranh của mình.",
      "D": "Đi vẽ bậy lên vở của bạn để trả đũa."
    },
    "answer": "C",
    "explanation": "Giữ vững lập trường và phản hồi lịch sự trước những lời chê bai tiêu cực giúp bảo vệ lòng tự tin và ngăn chặn hành vi bắt nạt tinh thần.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_90",
    "number": 90,
    "question": "Khi em làm bài tập làm văn bị cô giáo phê là \"Bài viết còn sơ sài, thiếu ý\". Người có tư duy phát triển sẽ sửa bài thế nào?",
    "options": {
      "A": "Viết lại bài văn mới dựa trên các gợi ý chi tiết của cô giáo, tham khảo thêm các bài văn mẫu hay để học cách dùng từ và hành văn sinh động hơn.",
      "B": "Vứt bài văn đi và nộp bài cũ lại cho cô chấm lại.",
      "C": "Nghĩ rằng cô giáo ghét mình nên mới phê như vậy.",
      "D": "Nhờ bố mẹ viết hộ hoàn toàn bài văn khác để nộp lại."
    },
    "answer": "A",
    "explanation": "Coi lời phê bình của giáo viên là chỉ dẫn chuyên môn hữu ích để nâng cấp năng lực làm văn của bản thân.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_91",
    "number": 91,
    "question": "Trong một trò chơi dân gian (như kéo co), nếu đội em thắng, thái độ ứng xử đúng đắn đối với đội thua là gì?",
    "options": {
      "A": "Chạy quanh đội bạn cười cợt, chế giễu: \"Đồ thua cuộc kêu ca!\".",
      "B": "Đến bắt tay đội bạn, khen ngợi đội bạn đã thi đấu nỗ lực và cùng nhau chụp ảnh lưu niệm vui vẻ.",
      "C": "Tỏ thái độ khinh khỉnh không thèm nói chuyện với đội bạn.",
      "D": "Yêu cầu đội bạn phải cống nạp toàn bộ phần quà cho mình."
    },
    "answer": "B",
    "explanation": "Sự khiêm tốn khi chiến thắng (winning with grace) và tôn trọng đối thủ thể hiện nhân cách văn minh và văn hóa ứng xử cao đẹp.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_92",
    "number": 92,
    "question": "Điều gì giúp ích nhất cho em khi đối mặt với một thất bại lớn trong học tập?",
    "options": {
      "A": "Sự đồng hành lắng nghe của cha mẹ, sự hướng dẫn tận tình của thầy cô giáo và ý chí quyết tâm không bỏ cuộc của chính em.",
      "B": "Việc trốn học đi chơi game để quên đi thất bại.",
      "C": "Việc mua thật nhiều đồ chơi đắt tiền để giải sầu.",
      "D": "Việc tự cô lập mình khỏi bạn bè xung quanh."
    },
    "answer": "A",
    "explanation": "Mạng lưới hỗ trợ xã hội (gia đình, nhà trường) kết hợp với nghị lực cá nhân là công thức hoàn hảo để vượt qua các cuộc khủng hoảng học đường.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_93",
    "number": 93,
    "question": "Em tự làm một chiếc diều giấy nhưng khi mang ra thả thì diều không bay lên được mà bị rơi rách cánh. Em nên hành động thế nào?",
    "options": {
      "A": "Dẫm nát chiếc diều và thề không bao giờ thả diều nữa.",
      "B": "Quan sát xem diều bị hỏng chỗ nào, tìm hiểu xem tỉ lệ cánh diều hay đuôi diều đã cân đối chưa, dán lại cánh diều bị rách và thử thả lại vào lúc có gió nhẹ.",
      "C": "Bắt đền bố mẹ phải mua cho chiếc diều nhựa đắt tiền ngoài cửa hàng.",
      "D": "Ngồi khóc đợi gió tự nâng chiếc diều rách lên."
    },
    "answer": "B",
    "explanation": "Khả năng thử nghiệm khoa học, phân tích lỗi sai kỹ thuật và kiên trì chế tạo lại giúp phát triển tư duy kỹ thuật và tính kiên nhẫn.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_94",
    "number": 94,
    "question": "Nhận định nào sau đây thể hiện niềm tin của tư duy phát triển?",
    "options": {
      "A": "\"Người giỏi toán là do họ sinh ra đã thông minh sẵn rồi\".",
      "B": "\"Chỉ cần mình chăm chỉ luyện tập và học hỏi đúng phương pháp, mình hoàn toàn có thể giỏi hơn ở bất kỳ môn học nào\".",
      "C": "\"Mình sinh ra đã không có khiếu âm nhạc nên học nhạc chỉ phí thời gian\".",
      "D": "\"Học giỏi hay không là do sự may rủi trong phòng thi\"."
    },
    "answer": "B",
    "explanation": "Cốt lõi của tư duy phát triển là niềm tin vào khả năng học tập, thích ứng và tự cải thiện không giới hạn của con người thông qua nỗ lực thực chất.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_95",
    "number": 95,
    "question": "Khi em tham gia một câu lạc bộ võ thuật và thấy các bạn khóa trước thực hiện những động tác bay nhảy rất khó mà mình chưa làm được. Thái độ đúng đắn là gì?",
    "options": {
      "A": "Tự ti xin rút khỏi câu lạc bộ vì thấy mình quá yếu kém.",
      "B": "Chăm chỉ luyện tập từ những thế võ cơ bản nhất, lắng nghe chỉ dẫn của huấn luyện viên và tin rằng kiên trì tập luyện mình cũng sẽ làm được như các bạn.",
      "C": "Liều lĩnh tập theo ngay lập tức các động tác khó dù chưa được hướng dẫn để chứng tỏ bản thân.",
      "D": "Trêu chọc các bạn khóa trước là đồ khoe mẽ."
    },
    "answer": "B",
    "explanation": "Tôn trọng lộ trình phát triển của bản thân, tập luyện kiên trì từ cơ bản đến nâng cao là nguyên tắc học tập kỹ năng an toàn và vững chắc.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_96",
    "number": 96,
    "question": "Khi em phạm lỗi làm vỡ chiếc bình hoa của lớp trong giờ ra chơi do mải chạy nhảy. Hành vi thể hiện tư duy chịu trách nhiệm là gì?",
    "options": {
      "A": "Đổ lỗi cho bạn đẩy mình nên mới làm vỡ bình.",
      "B": "Nhanh chóng dọn dẹp các mảnh vỡ an toàn, chủ động báo cáo với cô giáo chủ nhiệm, nhận lỗi chân thành và cùng bố mẹ đền lại chiếc bình mới cho lớp.",
      "C": "Giả vờ không biết và đi chỗ khác chơi.",
      "D": "Đổ mảnh vỡ vào cặp sách của bạn khác để vu khống."
    },
    "answer": "B",
    "explanation": "Thừa nhận sai lầm và chủ động khắc phục hậu quả là bài học thực tế lớn nhất về lòng dũng cảm và tinh thần trách nhiệm.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_97",
    "number": 97,
    "question": "Tại sao việc bị thua trong một trò chơi cờ vua lại có thể giúp em thông minh hơn?",
    "options": {
      "A": "Vì bị thua sẽ làm em tức giận và muốn phục thù.",
      "B": "Vì ván thua chỉ ra những sơ hở trong tư duy của em, giúp em học được chiến thuật mới của đối thủ để nâng cấp cách chơi của mình.",
      "C": "Vì thua cuộc làm em không muốn chơi nữa nên có thời gian học bài.",
      "D": "Không thể giúp thông minh hơn, thua cuộc chỉ làm em mệt mỏi."
    },
    "answer": "B",
    "explanation": "Sai lầm là những chỉ dẫn tuyệt vời trong quá trình học tập. Phân tích ván thua giúp kích hoạt tư duy phản biện và nâng cấp chiến thuật tư duy nhanh nhất.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_98",
    "number": 98,
    "question": "Em tham gia cuộc thi kể chuyện và quên mất lời thoại giữa chừng khiến bài thi không được điểm cao. Em tự nhủ thế nào để phục hồi tinh thần?",
    "options": {
      "A": "\"Mình là kẻ thất bại thảm hại, mình sẽ không bao giờ nói trước đám đông nữa\".",
      "B": "\"Lần này mình chưa chuẩn bị kỹ phần giữa câu chuyện. Lần sau mình sẽ viết kịch bản ra thẻ nhớ và tập nói nhiều lần hơn trước gương. Mình chắc chắn sẽ tiến bộ!\".",
      "C": "\"Ban giám khảo đã quá khắt khe với mình\".",
      "D": "\"Kể chuyện thật vô bổ, không thèm tham gia nữa\"."
    },
    "answer": "B",
    "explanation": "Tự thoại tích cực hướng vào giải pháp (solution-oriented self-talk) giúp giải tỏa cảm xúc tự ti và xây dựng hành động khắc phục lỗi sai cụ thể cho tương lai.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_99",
    "number": 99,
    "question": "Khi em thấy bạn mình đang buồn bã vì bị loại khỏi đội văn nghệ của trường, lời khuyên nào thể hiện sự hiểu biết về tư duy phát triển?",
    "options": {
      "A": "\"Cậu hát chán thế bị loại là đúng rồi, buồn làm gì\".",
      "B": "\"Đừng nản lòng cậu ơi! Lần này chỉ là cậu chưa phù hợp với bài múa này thôi. Bọn mình cùng tập hát tập múa tiếp nhé, cơ hội lần sau vẫn luôn chào đón cậu\".",
      "C": "\"Tớ nghĩ cậu không có năng khiếu nghệ thuật đâu, bỏ đi\".",
      "D": "\"Đi mua kẹo ngọt ăn cho quên nỗi buồn đi\"."
    },
    "answer": "B",
    "explanation": "Lời khuyên động viên bạn kiên trì rèn luyện và mở rộng cơ hội học hỏi trong tương lai thể hiện sự đồng cảm sâu sắc và tư duy phát triển lành mạnh.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Nhận_thức_&_Quản_lý_bản_thân_100",
    "number": 100,
    "question": "Bản chất của sự trưởng thành từ sai lầm (Tư duy phát triển) được tóm tắt qua thông điệp nào dưới đây?",
    "options": {
      "A": "Sai lầm chứng tỏ chúng ta ngu ngốc và cần bị trừng phạt.",
      "B": "Sai lầm và thất bại không phải là điểm kết thúc, mà là những nấc thang học tập giúp chúng ta trở nên mạnh mẽ, khôn ngoan và hoàn thiện bản thân hơn mỗi ngày.",
      "C": "Hãy luôn làm những việc dễ dàng để không bao giờ mắc sai lầm.",
      "D": "Mắc sai lầm thì đổ lỗi cho hoàn cảnh là xong."
    },
    "answer": "B",
    "explanation": "Đón nhận sai lầm như một cơ hội học tập là triết lý cốt lõi của tư duy phát triển, giúp hình thành nên những con người kiên trì, bản lĩnh và không ngừng tiến bộ.",
    "topic": "CHỦ ĐỀ 5: ĐỐI MẶT VỚI THẤT BẠI & TƯ DUY PHÁT TRIỂN",
    "group": "Nhận thức & Quản lý bản thân"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_1",
    "number": 1,
    "question": "Đâu là một môi trường học tập lý tưởng tại nhà giúp em tập trung học tốt nhất?",
    "options": {
      "A": "Ngồi học ngay trên giường ngủ, đắp chăn ấm và bật nhạc tivi lớn.",
      "B": "Góc học tập yên tĩnh, đủ ánh sáng, bàn ghế có chiều cao phù hợp, bàn học được dọn dẹp gọn gàng và không bày biện đồ chơi.",
      "C": "Bàn ăn trong bếp khi mọi người đang nấu ăn và nói chuyện ồn ào.",
      "D": "Ngồi ngoài ban công sát đường lộ xe chạy lúc tối mịt không có đèn."
    },
    "answer": "B",
    "explanation": "Môi trường học tập yên tĩnh, đủ sáng và ngăn nắp giúp giảm thiểu các tác nhân gây xao nhãng, bảo vệ thị lực và tăng khả năng tập trung của học sinh.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_2",
    "number": 2,
    "question": "Khi ngồi học bài ở lớp, em nhận thấy xung quanh có các tiếng động làm mình mất tập trung (ví dụ: các bạn bàn dưới đang thì thầm nói chuyện chơi). Cách ứng xử nào sau đây là đúng?",
    "options": {
      "A": "Quay xuống mắng mỏ các bạn thật to để cả lớp cùng nghe.",
      "B": "Tự nói thầm câu nhủ bản thân: \"Tập trung vào bài giảng nào!\" và hướng mắt lên bảng nghe cô giáo giảng, nếu bạn vẫn nói to có thể giơ tay báo cáo cô giáo hỗ trợ.",
      "C": "Quay xuống tham gia nói chuyện cùng các bạn cho vui.",
      "D": "Nằm gục xuống bàn học không nghe giảng nữa."
    },
    "answer": "B",
    "explanation": "Tự nhắc nhở bản thân (self-talk) là một kỹ thuật giúp rèn luyện khả năng tự kiểm soát chú ý trước tiếng ồn ngoại cảnh mà không đẩy tình huống thành mâu thuẫn bạn bè.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_3",
    "number": 3,
    "question": "Khi gặp một bài tập về nhà rất khó mà suy nghĩ mãi vẫn chưa giải được, hành vi chủ động học tập là gì?",
    "options": {
      "A": "Bỏ qua bài tập đó và đi chơi game.",
      "B": "Chép bài giải của bạn giỏi nhất lớp vào vở của mình để nộp cô giáo.",
      "C": "Đánh dấu bài tập đó lại, chủ động hỏi bố mẹ, thầy cô hoặc bạn bè hướng dẫn phương pháp làm bài sau giờ học.",
      "D": "Xé trang vở có bài tập đó đi để coi như không có."
    },
    "answer": "C",
    "explanation": "Biết chủ động tìm kiếm sự giúp đỡ khi gặp khó khăn (help-seeking skill) là biểu hiện của người có động lực học tập tốt và chủ động làm chủ tri thức.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_4",
    "number": 4,
    "question": "Phương pháp lập \"Thẻ ôn tập\" (Flashcards) giúp học sinh ghi nhớ từ vựng tiếng Anh hoặc công thức toán học như thế nào?",
    "options": {
      "A": "Viết toàn bộ bài học dài 3 trang giấy vào một chiếc thẻ nhựa lớn.",
      "B": "Thiết kế các tấm thẻ nhỏ, một mặt viết câu hỏi (hoặc từ mới), mặt kia viết đáp án (hoặc nghĩa của từ), dùng để tự kiểm tra kiến thức nhanh ở mọi nơi.",
      "C": "Dùng thẻ để chơi trò chơi ném bài với các bạn trong lớp.",
      "D": "Dán thẻ lên tường phòng khách để trang trí nhà cửa."
    },
    "answer": "B",
    "explanation": "Thẻ ôn tập (flashcards) là công cụ học tập chủ động (active recall) giúp kích thích não bộ ghi nhớ thông tin nhanh chóng, ngắn gọn thông qua việc tự truy vấn đáp án.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_5",
    "number": 5,
    "question": "Để theo dõi tiến trình học tập của bản thân hàng tuần, em nên làm gì?",
    "options": {
      "A": "So sánh điểm số của mình với điểm của bạn học giỏi nhất xem ai cao hơn.",
      "B": "Sử dụng một cuốn sổ tay nhỏ (hoặc bảng theo dõi), ghi lại những mục tiêu tuần và đánh dấu tích vào các phần bài tập đã hoàn thành để tự đánh giá mức độ tiến bộ của mình.",
      "C": "Đợi đến khi nhận phiếu liên lạc cuối học kỳ mới biết kết quả.",
      "D": "Nhờ bố mẹ tự theo dõi và kiểm tra giúp, mình không cần quan tâm."
    },
    "answer": "B",
    "explanation": "Tự theo dõi tiến trình học tập giúp học sinh nhận thức được sự tiến bộ của bản thân qua từng ngày, từ đó nâng cao tinh thần tự giác và động lực học tập nội tại.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_6",
    "number": 6,
    "question": "Theo lý thuyết về Phong cách học tập (VARK), học sinh có phong cách học tập \"Thị giác\" (Visual) sẽ tiếp thu kiến thức tốt nhất thông qua hình thức nào?",
    "options": {
      "A": "Chỉ nghe cô giáo giảng bài bằng lời nói nói liên tục.",
      "B": "Đọc sách chữ toàn văn bản dài dòng.",
      "C": "Xem các sơ đồ tư duy hình ảnh, video minh họa sinh động, biểu đồ màu sắc trực quan.",
      "D": "Thực hành vận động chạy nhảy ngoài sân trường."
    },
    "answer": "C",
    "explanation": "Người học theo phong cách thị giác tiếp thu thông tin hiệu quả nhất qua hình ảnh trực quan, sơ đồ phân tích màu sắc và cấu trúc hình họa rõ ràng.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_7",
    "number": 7,
    "question": "Hành vi sắp xếp sách vở học tập ngăn nắp trước khi đi ngủ giúp ích gì cho học sinh?",
    "options": {
      "A": "Giúp bố mẹ khen ngợi em ngoan ngoãn.",
      "B": "Tiết kiệm thời gian tìm kiếm sách vở vào sáng hôm sau và đảm bảo mang đầy đủ đồ dùng theo thời khóa biểu học tập.",
      "C": "Giúp balo trông nhẹ hơn khi đi học.",
      "D": "Không giúp ích gì cả, chỉ làm mệt thêm."
    },
    "answer": "B",
    "explanation": "Thói quen sắp xếp đồ dùng học tập gọn gàng thể hiện tính tự lập, tính kỷ luật cao và khả năng chuẩn bị tốt cho công việc.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_8",
    "number": 8,
    "question": "Tại sao việc bảo quản đồ dùng học tập cá nhân (như bút, thước, tẩy) lại là trách nhiệm của mỗi học sinh?",
    "options": {
      "A": "Để không bị bố mẹ mắng vì làm mất đồ dùng.",
      "B": "Thể hiện sự tôn trọng đối với mồ hôi công sức lao động của bố mẹ khi mua đồ dùng cho mình, đồng thời xây dựng đức tính tiết kiệm và ngăn nắp.",
      "C": "Để sau này bán lại đồ cũ lấy tiền tiêu vặt.",
      "D": "Để khoe với các bạn là đồ dùng của mình luôn mới tinh."
    },
    "answer": "B",
    "explanation": "Bảo quản tài sản cá nhân là bài học đầu tiên về trách nhiệm bản thân và sự chính trực, trân trọng giá trị sức lao động của gia đình.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_9",
    "number": 9,
    "question": "Trong lớp học, cách lắng nghe bài giảng của thầy cô hiệu quả nhất là gì?",
    "options": {
      "A": "Vừa nghe giảng vừa vẽ bậy lên bàn hoặc nghịch đồ chơi dưới gầm bàn.",
      "B": "Mắt nhìn lên bảng, tai lắng nghe lời giảng, tay ghi chú nhanh các ý quan trọng và đầu óc suy nghĩ để trả lời các câu hỏi gợi mở của thầy cô.",
      "C": "Nhìn chằm chằm vào cô giáo mà đầu óc nghĩ đến trò chơi game tối nay.",
      "D": "Nói chuyện thì thầm với bạn bên cạnh suốt tiết học."
    },
    "answer": "B",
    "explanation": "Lắng nghe chủ động (active listening) đòi hỏi sự kết hợp đồng bộ giữa các giác quan (mắt, tai, tay) và tư duy tích cực để tiếp thu kiến thức trọn vẹn nhất.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_10",
    "number": 10,
    "question": "Khi chuẩn bị ngồi học bài tại nhà, em thấy bàn học của mình bừa bộn nhiều vỏ kẹo, truyện tranh và đồ chơi. Em nên làm gì?",
    "options": {
      "A": "Cứ ngồi vào học bài bình thường, lờ đống bừa bộn đi.",
      "B": "Dành 3-5 phút quét sạch vỏ kẹo vào thùng rác, cất truyện tranh và đồ chơi vào ngăn tủ, lau sạch bàn rồi mới mở sách vở học bài.",
      "C": "Gọi bố mẹ vào dọn dẹp hộ bàn học cho mình.",
      "D": "Mang sách vở sang bàn ăn học để đỡ phải dọn."
    },
    "answer": "B",
    "explanation": "Dọn dẹp bàn học trước khi học tạo ra một không gian làm việc sạch sẽ, giúp tinh thần thoải mái, dễ tập trung vào bài học hơn.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_11",
    "number": 11,
    "question": "Em học tiếng Anh bằng cách nghe bài hát và nhắc lại từ vựng theo phát âm của ca sĩ. Phong cách học tập chính của em lúc này là gì?",
    "options": {
      "A": "Phong cách học tập thị giác (Visual).",
      "B": "Phong cách học tập thính giác (Auditory).",
      "C": "Phong cách học tập vận động (Kinesthetic).",
      "D": "Phong cách học tập đọc và viết (Read/Write)."
    },
    "answer": "B",
    "explanation": "Người học thính giác tiếp thu thông tin tốt nhất thông qua âm thanh, lời nói, nghe giảng, thảo luận nhóm và các bài học định dạng âm nhạc.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_12",
    "number": 12,
    "question": "Đâu là một phương pháp ôn tập bài cũ khoa học giúp thông tin lưu trữ lâu dài vào trí nhớ dài hạn?",
    "options": {
      "A": "Học dồn dập toàn bộ kiến thức vào đêm ngay trước ngày thi (học vẹt).",
      "B": "Ôn tập ngắt quãng (Spaced Repetition): xem lại bài học sau 1 ngày, sau 3 ngày, sau 1 tuần và sau 1 tháng để khắc sâu kiến thức vào não bộ.",
      "C": "Đọc đi đọc lại bài học nhiều lần không cần suy nghĩ ý nghĩa.",
      "D": "Chỉ làm bài tập một lần duy nhất và không bao giờ xem lại bài cũ."
    },
    "answer": "B",
    "explanation": "Lặp lại ngắt quãng (spaced repetition) dựa trên đường cong lãng quên của Ebbinghaus, giúp tái củng cố các liên kết thần kinh để ghi nhớ kiến thức bền vững nhất.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_13",
    "number": 13,
    "question": "Khi làm thẻ ôn tập môn Lịch sử về một sự kiện (ví dụ: Chiến thắng Điện Biên Phủ năm 1954), em nên ghi thông tin thế nào?",
    "options": {
      "A": "Sao chép nguyên văn 2 trang sách lịch sử vào mặt sau của thẻ.",
      "B": "Mặt trước ghi: \"Năm diễn ra Chiến thắng Điện Biên Phủ?\"; Mặt sau ghi ngắn gọn: \"Năm 1954\" kèm theo 1-2 ý nghĩa lịch sử lớn nhất.",
      "C": "Chỉ ghi chữ \"Chiến thắng\" ở cả hai mặt của thẻ.",
      "D": "Vẽ hình bản đồ chiến dịch thật chi tiết mà không ghi chữ nào."
    },
    "answer": "B",
    "explanation": "Nguyên tắc thiết kế flashcard là ngắn gọn, rõ ràng, tập trung vào mối liên kết câu hỏi - câu trả lời để kiểm tra kiến thức nhanh và hiệu quả.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_14",
    "number": 14,
    "question": "Em rất muốn tham gia trả lời câu hỏi của cô giáo trong giờ học nhưng sợ nói sai các bạn cười. Lời khuyên đúng đắn là gì?",
    "options": {
      "A": "Không bao giờ phát biểu nữa để giữ an toàn tuyệt đối.",
      "B": "Hiểu rằng việc nói sai trong lớp học là cơ hội tốt để thầy cô sửa lỗi và giúp mình học tập tốt hơn; dũng cảm giơ tay nói lên suy nghĩ của mình.",
      "C": "Nói thầm câu trả lời cho bạn bên cạnh phát biểu hộ.",
      "D": "Trêu chọc những bạn phát biểu sai khác trong lớp."
    },
    "answer": "B",
    "explanation": "Mắc sai lầm là một phần tất yếu của quá trình học tập. Việc vượt qua nỗi sợ sai giúp học sinh tự tin và tiến bộ nhanh chóng.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_15",
    "number": 15,
    "question": "Thói quen nào sau đây giúp học sinh tiểu học tự quản lý tốt tiến độ làm bài tập về nhà của mình?",
    "options": {
      "A": "Đợi đến khi cô giáo hỏi bài mới bắt đầu lục tìm vở để làm bài.",
      "B": "Sử dụng một cuốn sổ ghi chép bài tập (nhật ký học tập), ghi rõ nhiệm vụ của từng môn và thời hạn hoàn thành, gạch đi khi làm xong.",
      "C": "Nhờ bố mẹ làm bài tập hộ mỗi khi thấy bài khó.",
      "D": "Làm bài tập vào các giờ ra chơi ở lớp để về nhà có thời gian chơi game thỏa thích."
    },
    "answer": "B",
    "explanation": "Ghi chép bài tập giúp học sinh chủ động kiểm soát khối lượng công việc cần làm, rèn luyện kỹ năng tự quản lý công việc từ nhỏ.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_16",
    "number": 16,
    "question": "Khi em vừa học bài vừa bật điện thoại nhắn tin với bạn, hiệu quả học tập sẽ thế nào?",
    "options": {
      "A": "Học tập sẽ nhanh hơn vì em làm được hai việc cùng lúc.",
      "B": "Não bộ bị phân mảnh sự tập trung (gây mỏi mệt), làm bài tập dễ sai sót hơn và tốn gấp đôi thời gian so với khi tập trung hoàn toàn.",
      "C": "Giúp em nhớ kiến thức lâu hơn.",
      "D": "Không ảnh hưởng gì đến hiệu suất học tập."
    },
    "answer": "B",
    "explanation": "Đa nhiệm (multitasking) khi học tập là một sai lầm phổ biến. Não bộ thực chất chỉ chuyển đổi nhanh chóng giữa hai việc, gây hao tổn năng lượng thần kinh và suy giảm chất lượng học tập nghiêm trọng.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_17",
    "number": 17,
    "question": "Môn Khoa học yêu cầu học sinh học thông qua thực hành lắp ráp mạch điện đơn giản. Phương pháp học tập nào sau đây là phù hợp nhất cho chủ đề này?",
    "options": {
      "A": "Chỉ đọc thuộc lòng các định nghĩa dòng điện trong sách giáo khoa.",
      "B": "Xem tranh vẽ mô hình dòng điện trên bảng.",
      "C": "Trực tiếp thực hành tự tay lắp ráp các linh kiện pin, bóng đèn, dây điện dưới sự hướng dẫn của thầy cô (phong cách học vận động).",
      "D": "Nhờ bạn giỏi nhất lắp ráp hộ rồi nhìn kết quả."
    },
    "answer": "C",
    "explanation": "Học thông qua thực hành vận động (kinesthetic learning) giúp học sinh hiểu sâu sắc các nguyên lý kỹ thuật và ghi nhớ kiến thức lâu bền hơn thông qua trải nghiệm xúc giác.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_18",
    "number": 18,
    "question": "Nội quy lớp học được xây dựng nhằm mục đích gì?",
    "options": {
      "A": "Để giáo viên phạt học sinh dễ dàng hơn.",
      "B": "Giúp tạo ra một môi trường học tập an toàn, kỷ luật, tôn trọng lẫn nhau để tất cả mọi học sinh đều có thể học tập và phát triển tốt nhất.",
      "C": "Để hạn chế sự tự do sáng tạo của học sinh.",
      "D": "Để trang trí cho bức tường cuối lớp học trông đẹp mắt."
    },
    "answer": "B",
    "explanation": "Nội quy lớp học thiết lập các giới hạn hành vi văn minh, bảo vệ quyền lợi học tập và an toàn của mọi học sinh trong tập thể.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_19",
    "number": 19,
    "question": "Bạn của em gặp khó khăn khi làm bài văn miêu tả con vật nuôi và nhờ em giúp đỡ. Hành vi giúp bạn đúng đắn là gì?",
    "options": {
      "A": "Cho bạn sao chép nguyên văn bài làm văn của mình.",
      "B": "Viết hộ bạn bài văn đó từ đầu đến cuối.",
      "C": "Hướng dẫn bạn cách quan sát con vật, gợi ý các câu hỏi gợi mở về hình dáng, tiếng kêu để bạn tự viết bài văn của mình.",
      "D": "Từ chối thẳng thừng vì sợ bạn giỏi bằng mình."
    },
    "answer": "C",
    "explanation": "Giúp bạn học tập đúng cách là hướng dẫn phương pháp (dạy câu cá) chứ không phải làm thay nhiệm vụ của bạn (cho con cá), giúp bạn tự lập rèn luyện tư duy.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_20",
    "number": 20,
    "question": "Khi kết thúc một tuần học, việc tự hỏi bản thân: \"Tuần này mình đã học thêm được những kiến thức mới nào và mình đã áp dụng chúng vào thực tế cuộc sống như thế nào?\" giúp ích gì?",
    "options": {
      "A": "Giúp liên kết kiến thức lý thuyết đã học ở trường với thế giới thực tiễn cuộc sống, khắc sâu ý nghĩa của việc học.",
      "B": "Làm tăng gánh nặng suy nghĩ cho não bộ trước ngày cuối tuần.",
      "C": "Để tìm cách khoe khoang thành tích học tập với hàng xóm.",
      "D": "Không giúp ích gì, học xong là để thi lấy điểm là đủ."
    },
    "answer": "A",
    "explanation": "Đây là quá trình tự phản ánh (self-reflection) giúp chuyển đổi kiến thức thụ động thành năng lực thực hành thực tế, phát triển tư duy thực tiễn cho học sinh.",
    "topic": "CHỦ ĐỀ 1: KỸ NĂNG HỌC TẬP & CHUẨN BỊ MÔI TRƯỜNG HỌC TẬP HIỆU QUẢ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_21",
    "number": 21,
    "question": "Để duy trì thói quen đọc sách hàng ngày hiệu quả, phương pháp nào dưới đây là tốt nhất?",
    "options": {
      "A": "Đặt mục tiêu đọc hết một cuốn sách dày 100 trang ngay trong ngày đầu tiên.",
      "B": "Chọn các cuốn sách phù hợp với sở thích cá nhân, dành ra một khung giờ cố định mỗi ngày (ví dụ: 15-20 phút trước khi đi ngủ) để đọc đều đặn.",
      "C": "Chỉ đọc sách khi nào bố mẹ bắt buộc hoặc hứa thưởng quà.",
      "D": "Mua thật nhiều sách về bày trên kệ cho đẹp mắt và không cần đọc."
    },
    "answer": "B",
    "explanation": "Thói quen đọc sách được hình thành bền vững nhờ sự kiên trì thực hiện hàng ngày với khối lượng vừa sức và nội dung yêu thích, tạo sự tự giác tự nhiên cho học sinh.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_22",
    "number": 22,
    "question": "Khi sắp xếp tủ sách cá nhân tại nhà, phương pháp phân loại nào giúp em dễ dàng tìm kiếm sách khi cần dùng nhất?",
    "options": {
      "A": "Nhét tất cả các loại sách, truyện tranh, vở cũ lộn xộn vào các ngăn tủ.",
      "B": "Phân loại sách theo các thể loại rõ ràng (ví dụ: Sách giáo khoa, Sách khoa học, Truyện ngụ ngôn/cổ tích, Sách thơ) và xếp gáy sách hướng ra ngoài.",
      "C": "Xếp sách theo thứ tự màu sắc sặc sỡ từ nhạt đến đậm mà không quan tâm nội dung.",
      "D": "Xếp sách theo kích thước to nhỏ lộn xộn khắp phòng."
    },
    "answer": "B",
    "explanation": "Phân loại sách theo thể loại khoa học giúp quản lý không gian ngăn nắp, tiết kiệm thời gian tìm kiếm và bảo quản sách luôn phẳng phiu, sạch sẽ.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_23",
    "number": 23,
    "question": "Em được giao nhiệm vụ thuyết trình giới thiệu về một cuốn sách yêu thích trước lớp. Một bài giới thiệu sách đầy đủ cần có cấu trúc các phần nào?",
    "options": {
      "A": "Chỉ cần đọc to tên cuốn sách và đi xuống.",
      "B": "Tên cuốn sách, Tác giả, Nội dung chính/Nhân vật yêu thích, Bài học tâm đắc nhất rút ra từ cuốn sách và Lý do khuyên các bạn nên đọc.",
      "C": "Kể toàn bộ từng chi tiết từ đầu đến cuối cuốn sách cho cả lớp nghe.",
      "D": "Chỉ cần mô tả màu sắc sặc sỡ của trang bìa cuốn sách."
    },
    "answer": "B",
    "explanation": "Cấu trúc bài thuyết trình sách chuẩn giúp người nghe nắm bắt nhanh chóng thông tin cốt lõi, hiểu được giá trị nhân văn của cuốn sách và kích thích niềm yêu thích đọc sách của các bạn.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_24",
    "number": 24,
    "question": "Kỹ thuật \"Đọc lướt\" (Skimming) trong đọc sách được ứng dụng hiệu quả nhất khi nào?",
    "options": {
      "A": "Khi muốn học thuộc lòng từng câu từng chữ của bài học để đi thi.",
      "B": "Khi muốn nhanh chóng nắm được bức tranh tổng quan của chương sách, tìm kiếm các từ khóa chính hoặc định vị trang chứa thông tin cần tìm.",
      "C": "Khi đọc một tác phẩm văn học nghệ thuật giàu cảm xúc.",
      "D": "Khi vừa đọc sách vừa xem tivi giải trí."
    },
    "answer": "B",
    "explanation": "Đọc lướt giúp học sinh sàng lọc thông tin nhanh chóng trước khi quyết định đọc kỹ các phần trọng tâm, nâng cao năng suất xử lý tài liệu.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_25",
    "number": 25,
    "question": "Khi đọc một cuốn sách khoa học, việc ghi chú (taking notes) các thông tin quan trọng vào sổ tay giúp ích gì cho em?",
    "options": {
      "A": "Làm mỏi tay và tốn giấy mực của gia đình.",
      "B": "Giúp não bộ chủ động xử lý và lưu giữ thông tin tốt hơn, tạo tài liệu ôn tập ngắn gọn để dễ dàng xem lại sau này.",
      "C": "Để nộp cho giáo viên kiểm tra xem em có đọc sách thật không.",
      "D": "Để tập viết chữ đẹp cho bố mẹ vui lòng."
    },
    "answer": "B",
    "explanation": "Ghi chú chủ động biến việc đọc sách từ thụ động sang chủ động tương tác với tri thức, giúp tăng cường khả năng ghi nhớ và tổng hợp thông tin của học sinh.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_26",
    "number": 26,
    "question": "Em đang đọc một câu chuyện ngụ ngôn và bắt gặp một từ ngữ mới mà em chưa từng nghe bao giờ. Cách xử lý thông minh là gì?",
    "options": {
      "A": "Bỏ qua từ đó, đọc tiếp câu chuyện mà không cần hiểu nghĩa.",
      "B": "Tra từ điển tiếng Việt, đoán nghĩa dựa trên ngữ cảnh của câu chuyện hoặc hỏi người lớn gần đó để hiểu rõ nghĩa của từ trước khi đọc tiếp.",
      "C": "Gấp sách lại không đọc nữa vì sách quá khó hiểu.",
      "D": "Tự phát minh ra một nghĩa mới cho từ đó theo ý mình."
    },
    "answer": "B",
    "explanation": "Giải nghĩa từ mới giúp học sinh mở rộng vốn từ vựng phong phú, rèn luyện kỹ năng tra cứu thông tin độc lập và nâng cao khả năng đọc hiểu văn bản.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_27",
    "number": 27,
    "question": "Cách bảo quản một cuốn sách giấy luôn bền đẹp khi sử dụng là gì?",
    "options": {
      "A": "Gấp mép trang sách lại thật mạnh để đánh dấu trang đang đọc dở.",
      "B": "Úp ngược cuốn sách đang đọc xuống mặt bàn gồ ghề đầy bụi.",
      "C": "Sử dụng một tấm thẻ đánh dấu sách (bookmark) kẹp vào trang đang đọc, giữ sách bằng tay sạch khô và cất sách ngăn nắp lên giá sau khi dùng.",
      "D": "Dùng bút dạ vẽ bậy lên các trang sách để trang trí cho sinh động."
    },
    "answer": "C",
    "explanation": "Sử dụng bookmark và giữ gìn sạch sẽ giúp bảo vệ gáy sách và trang giấy không bị rách nát, nhăn nhúm, kéo dài tuổi thọ của sách.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_28",
    "number": 28,
    "question": "Khi đọc cuốn sách \"Truyện cổ tích Việt Nam\", đâu là phương pháp ghi chú thông tin nhân vật chính hiệu quả nhất?",
    "options": {
      "A": "Viết lại toàn bộ đoạn văn miêu tả ngoại hình nhân vật vào sổ tay.",
      "B": "Sử dụng sơ đồ tư duy (Mindmap) vẽ hình nhân vật ở trung tâm, các nhánh xung quanh ghi chú về: Tên nhân vật, Tính cách, Hành động nổi bật và Bài học ý nghĩa.",
      "C": "Chỉ ghi lại tên của các nhân vật chính.",
      "D": "Sao chép lại phần mục lục của cuốn sách."
    },
    "answer": "B",
    "explanation": "Sơ đồ tư duy trực quan hóa mối quan hệ giữa các thông tin giúp học sinh ghi nhớ cấu trúc nhân vật và cốt truyện một cách logic, dễ nhớ.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_29",
    "number": 29,
    "question": "Để việc thuyết trình cuốn sách yêu thích trước lớp cuốn hút và tự tin, em nên chuẩn bị những phi ngôn từ nào?",
    "options": {
      "A": "Đứng cúi gầm mặt xuống đất, tay đút túi quần và nói giọng lí nhí.",
      "B": "Tư thế đứng thẳng lưng, mắt nhìn tự tin vào các bạn dưới lớp, giọng nói to rõ ràng, truyền cảm và sử dụng cử chỉ tay nhẹ nhàng phù hợp nội dung.",
      "C": "Đứng rung chân liên tục, tay gãi đầu gãi tai và nói thật nhanh cho xong bài.",
      "D": "Vừa thuyết trình vừa quay lưng lại phía khán giả để nhìn lên màn hình chiếu."
    },
    "answer": "B",
    "explanation": "Sự kết hợp hài hòa giữa ngôn từ và phi ngôn từ (eye-contact, body language, giọng nói) là yếu tố quyết định sự cuốn hút và tính thuyết phục của bài thuyết trình.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_30",
    "number": 30,
    "question": "Đâu là một tiêu chí quan trọng giúp em tự lựa chọn một cuốn sách phù hợp để đọc giải trí tại nhà?",
    "options": {
      "A": "Cuốn sách có độ dày lớn nhất trong thư viện.",
      "B": "Cuốn sách có trang bìa màu hồng sặc sỡ nhất.",
      "C": "Cuốn sách phù hợp với lứa tuổi, thuộc thể loại em yêu thích (khoa học, phiêu lưu, thơ...) và có ngôn từ trong sáng lành mạnh.",
      "D": "Cuốn sách được các bạn lớn tuổi khuyên đọc dù chứa nhiều hình ảnh bạo lực."
    },
    "answer": "C",
    "explanation": "Chọn sách đúng độ tuổi và sở thích giúp duy trì niềm say mê đọc sách tự nhiên, tiếp thu kiến thức văn minh, lành mạnh phù hợp tâm sinh lý lứa tuổi tiểu học.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG ĐỌC SÁCH & GHI CHÚ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_31",
    "number": 31,
    "question": "Khi đi dã ngoại tại công viên sinh thái, em thấy một biển báo hình tròn, viền đỏ, nền trắng có vẽ hình một người đang vứt rác gạch chéo đỏ. Biển báo này có ý nghĩa gì?",
    "options": {
      "A": "Cho phép vứt rác tự do tại khu vực này.",
      "B": "Cấm vứt rác bừa bãi tại khu vực này để bảo vệ môi trường.",
      "C": "Khu vực dành riêng cho những người thu gom rác thải.",
      "D": "Hướng dẫn cách phân loại rác thải nhựa."
    },
    "answer": "B",
    "explanation": "Biển báo hình tròn viền đỏ thường là biển báo cấm. Nhận diện đúng biển báo công cộng giúp học sinh tuân thủ nội quy xã hội văn minh và giữ an toàn.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_32",
    "number": 32,
    "question": "Em đi siêu thị cùng gia đình và cần tìm nhà vệ sinh. Trên biển chỉ dẫn có vẽ hình một mũi tên chỉ sang bên phải kèm biểu tượng nam/nữ. Em nên đi hướng nào?",
    "options": {
      "A": "Đi thẳng về phía trước theo lối đi chính.",
      "B": "Rẽ sang hướng bên phải theo hướng chỉ của mũi tên.",
      "C": "Rẽ sang hướng trái để khám phá xem có gì không.",
      "D": "Đi ngược lại lối cửa ra vào siêu thị."
    },
    "answer": "B",
    "explanation": "Đọc đúng mũi tên hướng dẫn trên biển chỉ dẫn giúp học sinh định vị phương hướng chính xác trong các không gian công cộng lớn.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_33",
    "number": 33,
    "question": "Em được giao bài tập tìm kiếm thông tin trên Internet về \"Cách trồng và chăm sóc cây hoa sen đá tại nhà\". Từ khóa (keyword) nào dưới đây giúp tìm kiếm thông tin nhanh và chính xác nhất?",
    "options": {
      "A": "\"Tôi muốn biết làm thế nào để cây hoa sen đá của tôi không bị chết khi trồng ở nhà\".",
      "B": "\"Cách trồng chăm sóc sen đá tại nhà\".",
      "C": "\"Cây sen đá màu xanh lá cây\".",
      "D": "\"Trồng cây xanh\"."
    },
    "answer": "B",
    "explanation": "Từ khóa tìm kiếm internet cần ngắn gọn, tập trung vào danh từ và động từ chính của chủ đề cần tìm kiếm để công cụ tìm kiếm trả về kết quả sát nhất.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_34",
    "number": 34,
    "question": "Khi tìm hiểu thông tin trên Internet cho bài học Lịch sử, em thấy một trang mạng xã hội cá nhân viết rằng: \"Trạng Bùng Phùng Khắc Khoan là người đã phát minh ra máy bay\". Để đánh giá độ tin cậy của thông tin này, em nên làm gì?",
    "options": {
      "A": "Tin ngay lập tức vì thông tin đọc được trên mạng internet.",
      "B": "Tra cứu thông tin đối chiếu với các nguồn uy tín như sách giáo khoa Lịch sử, các trang web chính thống của chính phủ (.gov) hoặc thư viện trường học để xác minh tính chính xác.",
      "C": "Sao chép thông tin này chia sẻ ngay lên trang cá nhân của mình.",
      "D": "Mắng chửi người viết bài trên mạng vì viết sai lịch sử."
    },
    "answer": "B",
    "explanation": "Kỹ năng tư duy phản biện khi tiếp cận thông tin số đòi hỏi việc kiểm chứng đa nguồn thông tin, đặc biệt là ưu tiên các nguồn tin chính thống, có kiểm duyệt để tránh tin giả.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_35",
    "number": 35,
    "question": "Khi đọc một bài viết trên một website để lấy thông tin hiệu quả cho bài thuyết trình, bước đầu tiên em nên thực hiện là gì?",
    "options": {
      "A": "Sao chép toàn bộ văn bản của trang web dán vào bài làm.",
      "B": "Kiểm tra tác giả viết bài là ai, ngày đăng bài gần đây không, đọc lướt qua các tiêu đề chính để xem nội dung có đúng chủ đề mình cần tìm không.",
      "C": "Nhấp chuột vào tất cả các banner quảng cáo nhấp nháy trên trang web.",
      "D": "Đọc thật nhanh từ dưới lên trên mà không cần suy nghĩ ý nghĩa câu chữ."
    },
    "answer": "B",
    "explanation": "Đánh giá tổng quan nguồn gốc và tính cập nhật của trang web giúp học sinh sàng lọc thông tin chất lượng trước khi đi sâu vào đọc hiểu chi tiết.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_36",
    "number": 36,
    "question": "Em và bạn đi lạc trong một khu mua sắm lớn. Ở góc sảnh có một tấm bản đồ sơ đồ tầng \"Bản đồ hướng dẫn vị trí\" có chấm đỏ ghi chữ \"Bạn đang ở đây\" (You are here). Bản đồ này giúp ích gì cho em?",
    "options": {
      "A": "Giúp em tìm thấy trò chơi game yêu thích trên bản đồ.",
      "B": "Giúp xác định vị trí hiện tại của mình so với các lối thoát hiểm, quầy thông tin để tìm đường đi đến địa điểm cần thiết một cách an toàn.",
      "C": "Dùng bản đồ để gấp thành máy bay giấy ném chơi.",
      "D": "Không giúp ích gì, bản đồ chỉ dành cho người lớn đọc."
    },
    "answer": "B",
    "explanation": "Kỹ năng đọc bản đồ chỉ dẫn không gian giúp học sinh định vị tọa độ và xây dựng lộ trình di chuyển an toàn trong các tình huống khẩn cấp hoặc khi đi lạc.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_37",
    "number": 37,
    "question": "Một bài viết chia sẻ trên Facebook cảnh báo: \"Ăn mì tôm sống sẽ làm nổ dạ dày ngay lập tức\". Thông tin này không có nguồn kiểm chứng y khoa rõ ràng. Em nên ứng xử thế nào với thông tin này?",
    "options": {
      "A": "Chia sẻ ngay thông tin này cho tất cả bạn bè để mọi người cùng cảnh giác.",
      "B": "Giữ bình tĩnh, nhận diện đây là thông tin giật gân chưa kiểm chứng (tin giả), không chia sẻ và nhờ bố mẹ tìm kiếm các cảnh báo từ Bộ Y tế để hiểu đúng tác hại của mì tôm sống.",
      "C": "Tẩy chay mì tôm hoàn toàn và khóc lóc vì sợ hãi.",
      "D": "Viết bài bình luận tranh cãi nảy lửa với người đăng tin."
    },
    "answer": "B",
    "explanation": "Nhận diện tin giả, tin đồn giật gân trên mạng xã hội là kỹ năng số thiết yếu để bảo vệ tâm lý bản thân khỏi những nỗi sợ hãi vô căn cứ và ngăn ngừa lan truyền thông tin sai lệch.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_38",
    "number": 38,
    "question": "Khi tìm kiếm thông tin về biến đổi khí hậu trên Internet, trang web nào dưới đây cung cấp thông tin có độ tin cậy cao nhất?",
    "options": {
      "A": "Trang cá nhân của một blogger chuyên viết truyện cười trên Facebook.",
      "B": "Trang thông tin chính thức của các tổ chức quốc tế như UNESCO, Liên Hợp Quốc hoặc các Viện nghiên cứu khí tượng quốc gia.",
      "C": "Diễn đàn thảo luận game online của học sinh cấp 1.",
      "D": "Một trang tin tức không rõ tên nguồn gốc và đầy quảng cáo cá độ thể thao."
    },
    "answer": "B",
    "explanation": "Độ tin cậy của nguồn tin dựa trên uy tín của tổ chức công bố, quy trình kiểm duyệt khoa học và sự minh bạch của dữ liệu.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_39",
    "number": 39,
    "question": "Em thấy một biển báo màu xanh lam hình vuông, ở giữa có vẽ hình một người khuyết tật ngồi xe lăn trắng. Biển chỉ dẫn này có ý nghĩa gì?",
    "options": {
      "A": "Cấm người khuyết tật đi vào khu vực này.",
      "B": "Chỉ dẫn lối đi hoặc khu vực đỗ xe, hỗ trợ đặc quyền dành riêng cho người khuyết tật.",
      "C": "Khu vực dành cho những người thích chơi đua xe lăn.",
      "D": "Hướng dẫn cách sử dụng xe lăn an toàn."
    },
    "answer": "B",
    "explanation": "Biển chỉ dẫn màu xanh lam cung cấp thông tin hỗ trợ tiện ích dịch vụ công cộng cho cộng đồng, đặc biệt là các nhóm đối tượng yếu thế.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_40",
    "number": 40,
    "question": "Khi em tìm kiếm bài hát múa cho lớp trên Youtube và thấy hiển thị một thông báo bật lên: \"Chúc mừng bạn trúng thưởng iPhone 16! Nhấp vào đây để nhận quà ngay\". Hành vi sử dụng internet an toàn là:",
    "options": {
      "A": "Nhấp vào liên kết ngay để nhận điện thoại làm quà tặng bố mẹ.",
      "B": "Điền đầy đủ thông tin cá nhân (tên, số điện thoại, địa chỉ nhà) theo yêu cầu của trang web đó.",
      "C": "Nhận diện đây là trò lừa đảo câu view hoặc đánh cắp thông tin cá nhân độc hại, tắt thông báo đó đi và báo lại với bố mẹ.",
      "D": "Chia sẻ liên kết đó cho các bạn trong lớp cùng nhận giải thưởng."
    },
    "answer": "C",
    "explanation": "Đây là hình thức lừa đảo thu thập thông tin (phishing) rất phổ biến. Học sinh cần cảnh giác cao độ trước các giải thưởng ảo trên mạng xã hội để tự bảo vệ tài khoản gia đình.",
    "topic": "CHỦ ĐỀ 3: TÌM KIẾM, XỬ LÝ & ĐÁNH GIÁ THÔNG TIN",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_41",
    "number": 41,
    "question": "Nhóm của em được phân công dự án làm một tập san ảnh về các loài động vật hoang dã. Để bắt đầu công việc theo \"Tư duy máy tính: Tách nhỏ vấn đề\" (Decomposition), em nên làm gì?",
    "options": {
      "A": "Để sát ngày nộp bài rồi cả nhóm cùng cuống cuồng làm tất cả mọi việc cùng lúc.",
      "B": "Phân chia dự án lớn thành các nhiệm vụ nhỏ hơn: 1. Tìm thông tin; 2. Sưu tầm ảnh; 3. Viết lời thuyết minh; 4. Thiết kế dàn trang tập san; sau đó phân công công việc cụ thể cho từng thành viên.",
      "C": "Một mình làm hết mọi việc từ đầu đến cuối để tránh mất thời gian thảo luận.",
      "D": "Hủy bỏ dự án làm tập san và xin cô giáo làm bài kiểm tra viết thay thế."
    },
    "answer": "B",
    "explanation": "Tách nhỏ vấn đề (decomposition) là bước đầu tiên của tư duy máy tính, giúp đơn giản hóa bài toán phức tạp thành các bài toán nhỏ dễ quản lý và giải quyết hiệu quả.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_42",
    "number": 42,
    "question": "Em quan sát thấy cứ mỗi buổi chiều vào khoảng 5 giờ, đường phố trước cổng trường đều bị kẹt xe đông đúc. Theo \"Nhận diện quy luật\" (Pattern Recognition), em rút ra điều gì để lên kế hoạch đi học về thuận lợi?",
    "options": {
      "A": "Đây là quy luật ngẫu nhiên không có lý do cụ thể.",
      "B": "Nhận ra quy luật tan tầm của học sinh và công nhân viên chức, đề xuất bố mẹ đón mình lúc 4h45 chiều hoặc đi bộ về qua ngõ phụ để tránh kẹt xe lúc 5 giờ.",
      "C": "Bắt bố mẹ phải đón mình bằng xe cứu thương để được ưu tiên đi nhanh.",
      "D": "Ngồi chờ ở cổng trường đến 9 giờ đêm mới về nhà cho hết tắc đường."
    },
    "answer": "B",
    "explanation": "Nhận diện quy luật giúp học sinh phân tích xu hướng diễn biến của sự vật hiện tượng trong đời sống, từ đó chủ động dự đoán và đưa ra quyết định giải quyết vấn đề thông minh.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_43",
    "number": 43,
    "question": "Khái quát hóa vấn đề (Abstraction) trong tư duy máy tính được hiểu là gì?",
    "options": {
      "A": "Vẽ một bức tranh trừu tượng thật khó hiểu để nộp bài mỹ thuật.",
      "B": "Tập trung vào những thông tin cốt lõi, quan trọng nhất của vấn đề và loại bỏ đi những chi tiết phụ, không liên quan để dễ dàng xây dựng giải pháp chung.",
      "C": "Viết một bài văn thật dài dòng kể lể chi tiết tất cả các sự việc xảy ra.",
      "D": "Giả vờ như vấn đề đó không tồn tại trên đời."
    },
    "answer": "B",
    "explanation": "Khái quát hóa/Trừu tượng hóa (abstraction) giúp lược giản thông tin thừa, tập trung vào bản chất cốt lõi để giải quyết vấn đề nhanh chóng và có tính hệ thống cao.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_44",
    "number": 44,
    "question": "Em muốn giải quyết vấn đề \"Rác thải nhựa trong lớp học ngày càng nhiều\". Theo 4 bước giải quyết vấn đề, bước đầu tiên em cần làm là gì?",
    "options": {
      "A": "Đi mua các thùng đựng rác đắt tiền về đặt trong lớp.",
      "B": "Mô tả và xác định rõ vấn đề: Rác thải nhựa (chai nước, túi bóng) phát sinh từ đâu, số lượng thế nào và tại sao các bạn lại vứt rác lung tung.",
      "C": "Đề xuất phạt tiền các bạn vứt rác bừa bãi.",
      "D": "Tổ chức một cuộc tranh biện về tác hại của đồ nhựa."
    },
    "answer": "B",
    "explanation": "Bước 1 của giải quyết vấn đề là Xác định/Mô tả vấn đề rõ ràng. Nếu không hiểu rõ bản chất và nguyên nhân của vấn đề, các giải pháp đưa ra sau đó sẽ không hiệu quả.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_45",
    "number": 45,
    "question": "Khi đề xuất các giải pháp giải quyết vấn đề, tại sao chúng ta nên sử dụng mô hình dự đoán \"Nếu - Thì\" (If - Then)?",
    "options": {
      "A": "Để bài viết giải pháp trông dài dòng và mang tính khoa học hơn.",
      "B": "Giúp dự đoán trước các kết quả và tác động thực tế của từng giải pháp trước khi quyết định thực hiện, từ đó lựa chọn được phương án tối ưu nhất.",
      "C": "Để kiểm tra kỹ năng ngữ pháp môn Tiếng Việt.",
      "D": "Giúp đổ lỗi cho hoàn cảnh nếu giải pháp bị thất bại sau này."
    },
    "answer": "B",
    "explanation": "Mô hình tư duy \"Nếu - Thì\" giúp rèn luyện khả năng dự đoán logic và đánh giá rủi ro (risk assessment) một cách chủ động trước khi đưa ra quyết định hành động.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_46",
    "number": 46,
    "question": "Trình tự sắp xếp các bước thực hiện công việc nào sau đây thể hiện \"Tư duy quy trình\" logic khi giặt quần áo bằng máy giặt?",
    "options": {
      "A": "Cho quần áo vào máy -> Ấn nút khởi động -> Đổ bột giặt -> Phân loại quần áo -> Phơi quần áo.",
      "B": "Phân loại quần áo (trắng/màu) -> Cho quần áo vào lồng giặt -> Đổ bột giặt/nước xả vào ngăn chứa -> Chọn chế độ và ấn nút khởi động -> Phơi quần áo khi máy giặt xong.",
      "C": "Phơi quần áo -> Cho vào máy giặt -> Đổ nước xả -> Phân loại quần áo.",
      "D": "Đổ thật nhiều bột giặt trực tiếp lên quần áo đang phơi ngoài dây phơi."
    },
    "answer": "B",
    "explanation": "Tư duy quy trình (algorithmic thinking) yêu cầu sắp xếp các hành động theo một trình tự logic, chặt chẽ để đạt được kết quả mong muốn một cách tối ưu và an toàn.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_47",
    "number": 47,
    "question": "Em muốn giúp bố mẹ sắp xếp thực phẩm gọn gàng, an toàn trong tủ lạnh. Quy trình sắp xếp khoa học nào dưới đây là đúng?",
    "options": {
      "A": "Nhét tất cả thịt sống, rau luộc và quả chín lộn xộn vào ngăn đông đá.",
      "B": "Ngăn đông đá để thịt cá tươi sống; ngăn mát phía trên để thức ăn chín đậy kín; ngăn mát phía dưới để rau quả bọc túi thoáng khí; đồ gia vị xếp ở cánh cửa tủ lạnh.",
      "C": "Để hộp sữa đang uống dở chung với đĩa thịt lợn sống chưa rửa.",
      "D": "Để tất cả thực phẩm vào ngăn rau quả để tủ lạnh nhìn trông rộng rãi."
    },
    "answer": "B",
    "explanation": "Quy trình sắp xếp tủ lạnh khoa học giúp ngăn ngừa nhiễm chéo vi khuẩn từ thực phẩm sống sang chín, bảo quản chất dinh dưỡng tốt nhất và tiết kiệm năng lượng điện tiêu thụ.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_48",
    "number": 48,
    "question": "Em cần giải quyết vấn đề \"Bút mực của em liên tục bị rỉ mực ra tay khi viết bài\". Đâu là giải pháp khắc phục triệt để nhất?",
    "options": {
      "A": "Đeo găng tay nilon suốt cả ngày học để tay không bị bám mực.",
      "B": "Lau sạch ngòi bút, kiểm tra xem ruột bút có bị nứt hở khí không và vặn chặt ren bút; nếu ngòi bút bị hỏng thì thay ngòi mới hoặc thay ruột bút khác.",
      "C": "Chuyển sang viết bài bằng bút chì kim vĩnh viễn và không dùng bút mực nữa.",
      "D": "Vứt bút đi và khóc bắt mẹ mua cho chiếc bút máy vàng đắt tiền mới."
    },
    "answer": "B",
    "explanation": "Giải quyết vấn đề tận gốc đòi hỏi việc phân tích nguyên nhân lỗi kỹ thuật (root cause analysis) và sửa lỗi trực tiếp thay vì chỉ đối phó với hiện tượng bề ngoài.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_49",
    "number": 49,
    "question": "Trong các bước thực hành \"Tư duy máy tính\", bước thiết kế thuật toán (Algorithm Design) được hiểu là gì?",
    "options": {
      "A": "Lập trình viết mã code máy tính bằng ngôn ngữ khó hiểu.",
      "B": "Xây dựng một chuỗi các chỉ dẫn, hướng dẫn cụ thể theo từng bước rõ ràng để bất kỳ ai cũng có thể làm theo và giải quyết được vấn đề tương tự.",
      "C": "Vẽ các bức tranh mô tả hoạt động của robot.",
      "D": "Nhờ máy tính tự động đưa ra các giải pháp giải quyết thay cho con người."
    },
    "answer": "B",
    "explanation": "Thuật toán là tập hợp các bước chỉ dẫn rõ ràng. Thiết kế thuật toán giúp học sinh biết cách hệ thống hóa giải pháp để người khác (hoặc máy tính) có thể tái thực hiện chính xác.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_50",
    "number": 50,
    "question": "Em thấy một bạn trong lớp có xung đột cãi nhau với bạn khác chỉ vì tranh giành một quả bóng đá ở sân trường. Để giải quyết vấn đề hòa bình, em đề xuất giải pháp nào theo mô hình Nếu - Thì?",
    "options": {
      "A": "\"Nếu hai bạn tiếp tục cãi nhau thì tớ sẽ tịch thu quả bóng mang về nhà chơi\".",
      "B": "\"Nếu hai bạn cùng chia thời gian chia đội đá chung, hoặc luân phiên mỗi đội đá 15 phút, thì cả hai đều được chơi bóng vui vẻ và giữ được tình bạn tốt\".",
      "C": "\"Nếu hai bạn đánh nhau xem ai thắng thì người đó được quyền lấy bóng\".",
      "D": "\"Nếu hai bạn ghét nhau thì không nên nhìn mặt nhau nữa\"."
    },
    "answer": "B",
    "explanation": "Giải pháp hướng tới lợi ích chung (win - win) dựa trên phân tích Nếu - Thì giúp xoa dịu mâu thuẫn học đường hiệu quả, thúc đẩy sự hòa giải và đoàn kết.",
    "topic": "CHỦ ĐỀ 4: TƯ DUY LOGIC, MÁY TÍNH & GIẢI QUYẾT VẤN ĐỀ",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_51",
    "number": 51,
    "question": "Trong một cuộc thảo luận nhóm về chủ đề \"Có nên cho học sinh tiểu học tự quyết định thời gian xem tivi?\", hành vi nào thể hiện tư duy phản biện văn minh?",
    "options": {
      "A": "Lớn tiếng quát át giọng bạn khác khi bạn có ý kiến ngược lại với mình.",
      "B": "Lắng nghe cẩn thận luận điểm của bạn, đưa ra các lập luận logic và dẫn chứng cụ thể (ví dụ: tác hại của ánh sáng xanh, tính tự giác chưa cao ở lứa tuổi nhỏ) để bảo vệ quan điểm một cách tôn trọng.",
      "C": "Nói xấu sau lưng bạn vì bạn có ý kiến khác mình.",
      "D": "Đồng ý ngay lập tức với ý kiến của nhóm trưởng mà không cần suy nghĩ để được về sớm."
    },
    "answer": "B",
    "explanation": "Tư duy phản biện văn minh (critical thinking) yêu cầu sự lắng nghe tôn trọng, đánh giá lập luận dựa trên lý trí, logic và bằng chứng khách quan chứ không dựa trên cảm xúc cá nhân hay bạo lực ngôn từ.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_52",
    "number": 52,
    "question": "Để tìm hiểu và làm rõ nguyên nhân của một vấn đề (ví dụ: Tại sao lượng rác thải nhựa ở trường lại tăng cao?), em nên sử dụng công cụ đặt câu hỏi nào?",
    "options": {
      "A": "Công cụ đặt câu hỏi 5W1H (Who, What, Where, When, Why, How).",
      "B": "Công cụ đoán mò cảm tính dựa trên sở thích cá nhân.",
      "C": "Hỏi bất kỳ một bạn lớp 1 nào gặp trên sân trường.",
      "D": "Không đặt câu hỏi vì sợ bị cho là phiền phức."
    },
    "answer": "A",
    "explanation": "Khung câu hỏi 5W1H (Ai, Cái gì, Ở đâu, Khi nào, Tại sao, Như thế nào) giúp thu thập thông tin toàn diện, sâu sắc và có hệ thống về mọi mặt của vấn đề cần nghiên cứu.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_53",
    "number": 53,
    "question": "Khi thực hiện kỹ thuật \"Công não\" (Brainstorming) để tìm ý tưởng sáng tạo cho dự án tái chế rác thải nhựa, nguyên tắc nào sau đây là quan trọng nhất?",
    "options": {
      "A": "Chỉ tập trung vào những ý tưởng cũ đã có và bác bỏ ngay các ý tưởng mới lạ.",
      "B": "Thu thập thật nhiều ý tưởng khác nhau (chú trọng số lượng trước), không phán xét hay chê bai ý tưởng của người khác trong giai đoạn đầu để khuyến khích sự sáng tạo tự do.",
      "C": "Bắt tất cả các thành viên phải đồng ý với ý tưởng duy nhất của nhóm trưởng.",
      "D": "Chỉ những bạn học giỏi nhất nhóm mới được phát biểu ý kiến."
    },
    "answer": "B",
    "explanation": "Công não (brainstorming) cần tạo ra một môi trường an toàn tâm lý, hoãn việc đánh giá phán xét để kích thích não bộ sản sinh ra nhiều ý tưởng độc đáo, đột phá mà không sợ sai.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_54",
    "number": 54,
    "question": "Phương pháp tư duy \"6 chiếc mũ tư duy\" giúp ích gì cho học sinh khi giải quyết một vấn đề trong hoạt động nhóm?",
    "options": {
      "A": "Giúp các thành viên phân chia đội mũ nhiều màu sắc để chụp ảnh lưu niệm.",
      "B": "Giúp nhóm nhìn nhận một vấn đề từ 6 góc nhìn khác nhau (Sự thật, Cảm xúc, Rủi ro, Lợi ích, Sáng tạo, Quản lý) để đưa ra quyết định toàn diện và sáng suốt nhất.",
      "C": "Yêu cầu nhóm trưởng phải đội chiếc mũ to nhất lớp để làm gương.",
      "D": "Để hạn chế các cuộc tranh luận, yêu cầu mọi người chỉ suy nghĩ một hướng duy nhất."
    },
    "answer": "B",
    "explanation": "Kỹ thuật 6 chiếc mũ tư duy (Edward de Bono) huấn luyện học sinh tư duy đa chiều, tránh bẫy thiên vị cảm tính và khai thác triệt để trí tuệ tập thể.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_55",
    "number": 55,
    "question": "Em muốn đề xuất một giải pháp sáng tạo để tiết kiệm nước sạch tại gia đình. Ý tưởng nào dưới đây thể hiện tư duy sáng tạo thiết thực?",
    "options": {
      "A": "Nhịn tắm rửa giặt giũ hoàn toàn để không dùng giọt nước nào.",
      "B": "Tận dụng nước rửa rau, vo gạo lần cuối để làm nước tưới cây cảnh quanh sân nhà hoặc xả bồn cầu.",
      "C": "Mở vòi nước chảy tự do suốt ngày để kiểm tra độ mạnh của nước.",
      "D": "Bắt bố mẹ mua nước khoáng đóng chai về tắm để tiết kiệm nước máy gia đình."
    },
    "answer": "B",
    "explanation": "Tư duy sáng tạo gắn liền với thực tiễn (creative problem solving) giúp tạo ra các phương án tối ưu hóa nguồn lực hiện có, mang lại giá trị bảo vệ môi trường thiết thực.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_56",
    "number": 56,
    "question": "Trong phương pháp \"6 chiếc mũ tư duy\", Chiếc mũ Màu Đen (Black Hat) đại diện cho góc nhìn nào?",
    "options": {
      "A": "Những cảm xúc, trực giác và phản ứng tức thời của con người.",
      "B": "Sự thật khách quan, các số liệu thực tế đã được kiểm chứng khoa học.",
      "C": "Những rủi ro, điểm yếu, nguy cơ có thể xảy ra và các tác động tiêu cực của giải pháp.",
      "D": "Những ý tưởng mới lạ, các giải pháp đột phá độc đáo."
    },
    "answer": "C",
    "explanation": "Mũ đen đóng vai trò phản biện, chỉ ra các nguy cơ, rủi ro tiềm ẩn để nhóm xây dựng các phương án phòng vệ và dự phòng hiệu quả, giúp giải pháp hoàn thiện hơn.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_57",
    "number": 57,
    "question": "Khi tham gia cuộc thi tranh biện về chủ đề \"Nên hay không nên sử dụng đồ nhựa dùng một lần?\", nhiệm vụ của đội phản đối sử dụng đồ nhựa là gì?",
    "options": {
      "A": "Quát thét bảo đội đối phương là những người phá hoại môi trường.",
      "B": "Đưa ra các bằng chứng khoa học về tác hại của hạt vi nhựa đối với sức khỏe con người, thời gian phân hủy của túi nilon kéo dài hàng trăm năm và đề xuất các giải pháp thay thế thân thiện (như ống hút tre, túi vải).",
      "C": "Đồng ý hoàn toàn với các lập luận bảo vệ sự tiện lợi của đội bạn.",
      "D": "Bỏ cuộc giữa chừng vì thấy đối thủ nói rất hay."
    },
    "answer": "B",
    "explanation": "Tranh biện học đường đòi hỏi các lập luận phản biện phải dựa trên cấu trúc lý luận vững chắc, số liệu thực chứng và có các giải pháp thay thế khả thi.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_58",
    "number": 58,
    "question": "Tại sao việc lãng phí đồ ăn trong gia đình lại được xem là một vấn đề cần giải quyết bằng tư duy phản biện?",
    "options": {
      "A": "Vì lãng phí đồ ăn sẽ làm bếp bị bẩn và thu hút kiến gián.",
      "B": "Vì việc lãng phí thức ăn liên quan trực tiếp đến lãng phí tiền bạc của gia đình, lãng phí công sức sản xuất của người nông dân và gây áp lực rác thải hữu cơ lên môi trường toàn cầu.",
      "C": "Vì lãng phí đồ ăn sẽ bị bố mẹ phạt không cho xem tivi.",
      "D": "Không có gì nghiêm trọng, có tiền thì mua đồ ăn mới là được."
    },
    "answer": "B",
    "explanation": "Tư duy phản biện giúp học sinh nhận thức được mối quan hệ nhân quả (cause-and-effect) giữa hành vi cá nhân với các vấn đề kinh tế, xã hội và sinh thái xung quanh mình.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_59",
    "number": 59,
    "question": "Ý tưởng nào dưới đây là một sản phẩm tái chế sáng tạo từ vỏ chai nhựa đã qua sử dụng?",
    "options": {
      "A": "Vứt vỏ chai nhựa xuống sông để làm phao bơi tự nhiên.",
      "B": "Rửa sạch chai nhựa, cắt tạo hình trang trí và đục lỗ thoát nước để làm thành các chậu trồng cây hoa mười giờ treo ở ban công lớp học.",
      "C": "Đốt chai nhựa để làm nến thắp sáng phòng học.",
      "D": "Dùng chai nhựa để ném nhau chơi trong giờ ra chơi."
    },
    "answer": "B",
    "explanation": "Tái chế sáng tạo (upcycling) biến rác thải nhựa thành các vật dụng hữu ích, mang tính thẩm mỹ và giáo dục ý thức bảo vệ môi trường sâu sắc cho học sinh.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Tư_duy_&_Học_tập_thế_kỷ_21_60",
    "number": 60,
    "question": "Khi thảo luận nhóm, một bạn đưa ra một ý tưởng giải pháp rất mới lạ nhưng nghe có vẻ phi thực tế. Thái độ phản biện tích cực là:",
    "options": {
      "A": "Cười lớn chế giễu ý tưởng của bạn là điên rồ trước cả nhóm.",
      "B": "Lắng nghe bạn giải thích chi tiết ý tưởng, ghi nhận sự sáng tạo độc đáo của bạn và đặt câu hỏi gợi mở: \"Ý tưởng của cậu rất thú vị! Làm thế nào để tụi mình có thể thực hiện nó với nguyên liệu rẻ tiền này nhỉ?\".",
      "C": "Bỏ qua ý kiến của bạn hoàn toàn và tự làm theo ý mình.",
      "D": "Mách cô giáo là bạn đang nói chuyện linh tinh trong giờ học nhóm."
    },
    "answer": "B",
    "explanation": "Nuôi dưỡng tinh thần đổi mới sáng tạo bắt đầu từ sự cởi mở tiếp nhận các góc nhìn khác biệt, cùng thảo luận nâng cấp ý tưởng thay vì vội vã phủ nhận.",
    "topic": "CHỦ ĐỀ 5: TƯ DUY PHẢN BIỆN & SÁNG TẠO THẾ KỶ 21",
    "group": "Tư duy & Học tập thế kỷ 21"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_1",
    "number": 1,
    "question": "Em và các bạn đang xếp hàng chờ đến lượt chơi xích đu ở sân trường. Một bạn cùng lớp chạy đến chen ngang lên trước em. Cách ứng xử văn minh là gì?",
    "options": {
      "A": "Đẩy mạnh bạn ra khỏi hàng và cãi nhau với bạn.",
      "B": "Giữ bình tĩnh, nói nhẹ nhàng nhưng rõ ràng: \"Chào bạn, mọi người đều đang xếp hàng chờ đến lượt, phiền bạn xuống cuối hàng xếp hàng cùng bọn mình nhé\".",
      "C": "Im lặng bỏ đi chỗ khác chơi và ấm ức một mình.",
      "D": "Chạy đi mách cô giáo ngay lập tức để cô phạt bạn."
    },
    "answer": "B",
    "explanation": "Giao tiếp lịch sự và khẳng định quyền lợi chính đáng một cách ôn hòa (assertive) giúp giải quyết vấn đề chen hàng hiệu quả mà không gây xung đột bạo lực.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_2",
    "number": 2,
    "question": "Giờ ra chơi, em thấy một bạn học sinh mới chuyển trường đang đứng rụt rè một mình ở góc sân, nhìn các bạn khác chơi nhảy dây. Em nên làm gì?",
    "options": {
      "A": "Lờ bạn đi và tiếp tục chơi nhảy dây cùng nhóm bạn của mình.",
      "B": "Tiến lại gần, cười thân thiện và chủ động mời bạn: \"Chào bạn! Bọn mình đang chơi nhảy dây vui lắm, cậu có muốn vào chơi chung với tụi mình không?\".",
      "C": "Rủ các bạn khác ra trêu chọc ngoại hình của bạn mới.",
      "D": "Đứng từ xa chỉ trỏ và bàn tán về bạn."
    },
    "answer": "B",
    "explanation": "Chủ động mời bạn mới chơi cùng thể hiện sự đồng cảm, hiếu khách và giúp bạn mới nhanh chóng hòa nhập với môi trường tập thể học đường.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_3",
    "number": 3,
    "question": "Một bạn cùng lớp cho em mượn chiếc bút chì để viết bài khi em bị quên hộp bút ở nhà. Khi trả lại bút cho bạn, em nên nói gì?",
    "options": {
      "A": "Trả bút lại không nói lời nào.",
      "B": "\"Bút này viết chán lắm, nhưng dù sao cũng cảm ơn cậu nhé\".",
      "C": "Nhìn thẳng vào mắt bạn, mỉm cười và nói chân thành: \"Cảm ơn cậu rất nhiều vì đã cho tớ mượn bút nhé! Bút viết rất tốt\".",
      "D": "Giữ bút lại dùng luôn không trả bạn nữa."
    },
    "answer": "C",
    "explanation": "Lời cảm ơn chân thành đi kèm với ánh mắt tôn trọng (eye-contact) thể hiện sự biết ơn sâu sắc đối với sự giúp đỡ của bạn bè, thắt chặt tình bạn.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_4",
    "number": 4,
    "question": "Khi đang chạy nhảy trong hành lang lớp học, em vô tình va phải một bạn làm bạn bị rơi cặp sách và sách vở tung tóe ra đất. Em nên xử lý thế nào?",
    "options": {
      "A": "Chạy trốn thật nhanh để không ai biết mình là người va phải.",
      "B": "Đứng cười cợt và bảo: \"Cậu đi đứng kiểu gì thế?\".",
      "C": "Dừng lại ngay lập tức, đỡ bạn dậy, nói lời xin lỗi chân thành: \"Tớ xin lỗi nhé, tớ vô ý quá! Cậu có bị đau ở đâu không?\" và cùng bạn nhặt sách vở xếp gọn vào cặp.",
      "D": "Mắng bạn vì tội đứng chắn đường chạy của mình."
    },
    "answer": "C",
    "explanation": "Xin lỗi chân thành khi vô ý làm đau hoặc ảnh hưởng đến người khác và chủ động hỗ trợ khắc phục hậu quả là bài học ứng xử cốt lõi của học sinh văn minh.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_5",
    "number": 5,
    "question": "Khi ngồi ăn cơm cùng gia đình hoặc khi đi ăn tiệc, hành vi ứng xử lịch sự nào em cần tuân thủ?",
    "options": {
      "A": "Gõ bát đũa tạo ra âm thanh lớn để gọi món ăn nhanh hơn.",
      "B": "Chờ người lớn tuổi nhất (ông bà, bố mẹ) cầm đũa ăn trước, dùng đũa/thìa gắp lượng thức ăn vừa đủ vào bát của mình, nhai nhỏ nhẹ không phát ra tiếng chóp chép.",
      "C": "Vừa nhai đầy thức ăn trong miệng vừa nói chuyện to tiếng để kể chuyện cười.",
      "D": "Chỉ gắp những miếng thịt ngon nhất sang bát của mình và bỏ rau củ quả lại."
    },
    "answer": "B",
    "explanation": "Nghi thức bàn ăn (table manners) thể hiện sự kính trọng đối với người lớn tuổi, sự tế nhị và tôn trọng đối với những người cùng ăn cơm chung.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_6",
    "number": 6,
    "question": "Em được bố mẹ cho sang nhà bạn thân chơi cuối tuần. Khi bước vào nhà bạn, hành động đầu tiên em nên làm là gì?",
    "options": {
      "A": "Chạy thẳng vào phòng bạn chơi game luôn mà không cần chào hỏi ai.",
      "B": "Chào hỏi lễ phép người lớn trong nhà bạn (bố mẹ, ông bà của bạn), cất giày dép gọn gàng vào tủ hoặc nơi quy định.",
      "C": "Tự ý mở tủ lạnh nhà bạn tìm đồ ăn nước uống mà không hỏi xin phép.",
      "D": "Nhảy nhảy đùa nghịch trên ghế sofa ở phòng khách."
    },
    "answer": "B",
    "explanation": "Phép lịch sự khi làm khách nhà người khác đòi hỏi sự lễ phép chào hỏi chủ nhà, tôn trọng không gian riêng tư và tuân thủ các quy tắc sắp xếp đồ đạc của gia đình bạn.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_7",
    "number": 7,
    "question": "Khi gặp thầy cô giáo ở hành lang trường học (dù không dạy lớp mình), hành vi ứng xử lễ phép là gì?",
    "options": {
      "A": "Tránh mặt đi chỗ khác hoặc giả vờ cúi xuống nghịch điện thoại để không phải chào.",
      "B": "Đứng nghiêm túc, khoanh tay trước ngực hoặc cúi đầu nhẹ, nhìn thầy/cô và chào lễ phép: \"Em chào thầy/cô ạ!\".",
      "C": "Gọi tên thầy/cô thật to rồi chạy vèo qua mặt.",
      "D": "Chỉ chào những thầy cô nào thường xuyên cho mình điểm cao."
    },
    "answer": "B",
    "explanation": "Chào hỏi thầy cô giáo thể hiện truyền thống tôn sư trọng đạo và văn hóa học đường văn minh, lễ phép của học sinh tiểu học.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_8",
    "number": 8,
    "question": "Trên mạng xã hội (hoặc trong nhóm Zalo của lớp học), một bạn đăng bức ảnh vẽ tranh tự tay vẽ của bạn. Lựa chọn bình luận văn minh là gì?",
    "options": {
      "A": "\"Vẽ xấu như thế này mà cũng bày đặt đăng lên khoe khoang\".",
      "B": "\"Bức tranh có màu sắc tươi sáng rất đẹp! Cậu vẽ ngày càng tiến bộ đấy, chúc mừng cậu nhé!\".",
      "C": "Viết thật nhiều biểu tượng icon chế giễu bạn.",
      "D": "Lờ đi không quan tâm hoặc báo cáo bài viết của bạn vì tội rác mạng."
    },
    "answer": "B",
    "explanation": "Ứng xử văn minh trên mạng xã hội (digital netiquette) yêu cầu sử dụng ngôn từ tích cực, khích lệ nỗ lực của người khác và tránh các hành vi xúc phạm, bắt nạt trực tuyến.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_9",
    "number": 9,
    "question": "Trong ngày Tết Nguyên Đán, khi chúc Tết ông bà họ hàng, tư thế và phi ngôn từ nào thể hiện sự chân thành, lễ phép?",
    "options": {
      "A": "Đứng khoanh tay, mắt nhìn lễ phép vào ông bà, nói lời chúc Tết rõ ràng, to vừa đủ nghe bằng giọng vui tươi, ấm áp.",
      "B": "Vừa chúc Tết vừa ngó xem người lớn có chuẩn bị rút lì bao lì xì cho mình không.",
      "C": "Đứng ngậm kẹo, tay đút túi quần và chúc qua loa cho xong.",
      "D": "Đọc thật nhanh lời chúc như trả bài rồi chạy đi chơi game."
    },
    "answer": "A",
    "explanation": "Phi ngôn từ lễ phép khi chúc Tết (đứng khoanh tay, mắt nhìn tôn trọng) thể hiện sự chân thành và lòng biết ơn của con cháu đối với đấng sinh thành, người lớn tuổi trong gia đình.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_10",
    "number": 10,
    "question": "Khi em làm hỏng một món đồ chơi của lớp (như bộ xếp hình lego), hành động thể hiện sự trung thực là gì?",
    "options": {
      "A": "Giấu các mảnh vỡ vào một xó tối để không ai phát hiện ra.",
      "B": "Chủ động báo cáo với cô giáo chủ nhiệm, nói lời xin lỗi chân thành và đề xuất cùng bố mẹ mua bộ xếp hình mới đền lại cho lớp.",
      "C": "Nói dối là do bạn khác làm vỡ chứ không phải mình.",
      "D": "Khóc lóc ăn vạ bảo đồ chơi tự hỏng chứ mình không chạm vào."
    },
    "answer": "B",
    "explanation": "Trung thực nhận lỗi và chịu trách nhiệm khắc phục hậu quả là biểu hiện của học sinh chính trực, có lòng tự trọng và tôn trọng tài sản chung của tập thể.",
    "topic": "CHỦ ĐỀ 1: GIAO TIẾP VĂN MINH & ỨNG XỬ LỊCH THIỆP",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_11",
    "number": 11,
    "question": "Khi bạn thân của em đang tâm sự về việc bạn buồn bã do chú cún cưng bị ốm, hành vi lắng nghe chủ động là gì?",
    "options": {
      "A": "Vừa nghe bạn nói vừa mắt nhìn vào màn hình điện thoại chơi game.",
      "B": "Nhìn thẳng vào mắt bạn, thỉnh thoảng gật đầu tỏ ý thấu hiểu, đặt các câu hỏi hỏi han sức khỏe chú cún và nói lời chia sẻ động viên bạn.",
      "C": "Cắt ngang lời bạn: \"Ôi dào cún ốm thôi mà, tớ còn có máy chơi game mới xịn hơn nhiều đây này!\".",
      "D": "Bỏ đi chỗ khác chơi vì thấy câu chuyện của bạn thật tẻ nhạt."
    },
    "answer": "B",
    "explanation": "Lắng nghe chủ động (active listening) đòi hỏi sự hiện diện trọn vẹn, tương tác qua ánh mắt và phản hồi thấu cảm nhằm thể hiện sự trân trọng đối với cảm xúc của người đối diện.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_12",
    "number": 12,
    "question": "Một bạn trong lớp có giọng nói nói ngọng ở địa phương và thường bị một số bạn trêu chọc. Hành động thể hiện sự tôn trọng khác biệt là gì?",
    "options": {
      "A": "Tham gia trêu chọc cùng các bạn khác cho vui lớp vui vẻ.",
      "B": "Lắng nghe ý kiến của bạn một cách bình thường, không trêu chọc và nhắc nhở các bạn khác hãy tôn trọng nét riêng của bạn.",
      "C": "Khuyên bạn nên im lặng và không bao giờ phát biểu trong lớp nữa.",
      "D": "Tránh xa bạn vì sợ bị lây giọng nói ngọng."
    },
    "answer": "B",
    "explanation": "Tôn trọng sự khác biệt (diversity & inclusion) là giá trị đạo đức cốt lõi giúp xây dựng môi trường học đường nhân văn, an toàn, nơi mọi học sinh đều được đối xử bình đẳng và tôn trọng.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_13",
    "number": 13,
    "question": "Thế nào là \"Đồng cảm\" (Empathy) với những người xung quanh?",
    "options": {
      "A": "Là khả năng tự đặt mình vào hoàn cảnh của người khác để thấu hiểu cảm xúc, suy nghĩ của họ và đưa ra những hành động chia sẻ, giúp đỡ phù hợp.",
      "B": "Là việc khóc lóc cùng với người khác mỗi khi họ gặp chuyện buồn mà không làm gì giúp đỡ.",
      "C": "Là việc cho người khác tiền bạc mỗi khi thấy họ gặp khó khăn để họ tự giải quyết.",
      "D": "Là việc đồng ý với tất cả hành vi của người khác kể cả khi họ làm sai."
    },
    "answer": "A",
    "explanation": "Đồng cảm là năng lực cốt lõi của Trí tuệ cảm xúc (EQ), giúp chúng ta kết nối sâu sắc với con người, chia sẻ nỗi đau và cùng nhau xây dựng cộng đồng tử tế.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_14",
    "number": 14,
    "question": "Khi em muốn nhận xét, góp ý giúp bạn viết chữ đẹp hơn, cách nói nào thể hiện sự khích lệ và tránh gây tổn thương cho bạn?",
    "options": {
      "A": "\"Chữ cậu viết xấu như chữ gà bới ấy, tớ đọc chả hiểu gì!\".",
      "B": "\"Chữ cậu viết có các nét rất đều nhé! Nếu cậu chú ý viết các chữ cái thẳng hàng hơn một chút thì bài viết sẽ rất đẹp và dễ đọc hơn nhiều đấy\".",
      "C": "\"Cậu đừng bao giờ viết bài nữa, để tớ viết hộ cho nhanh\".",
      "D": "\"Chữ cậu viết thế này thì thi trượt là cái chắc\"."
    },
    "answer": "B",
    "explanation": "Phương pháp phản hồi tích cực (sandwich feedback) bắt đầu bằng việc ghi nhận điểm tốt, sau đó đưa ra lời khuyên cải thiện cụ thể bằng thái độ tôn trọng, giúp bạn tiếp thu ý kiến vui vẻ.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_15",
    "number": 15,
    "question": "Bạn của em có một quan điểm hoàn toàn khác em về việc lựa chọn trò chơi giải trí trong giờ ra chơi. Thái độ ứng xử đúng đắn là gì?",
    "options": {
      "A": "Cãi nhau quyết liệt để bắt bạn phải đồng ý với ý kiến của mình.",
      "B": "Nghỉ chơi với bạn vì bạn không cùng sở thích.",
      "C": "Lắng nghe giải thích của bạn về trò chơi đó, hiểu rằng mỗi người có sở thích riêng, và cùng nhau thương lượng chọn trò chơi chung phù hợp hoặc luân phiên chơi cả hai trò.",
      "D": "Đi nói xấu ý tưởng trò chơi của bạn với các bạn khác."
    },
    "answer": "C",
    "explanation": "Tôn trọng ý kiến khác biệt (respecting other perspectives) là nền tảng của kỹ năng thương lượng và hợp tác, giúp duy trì tình bạn và giải quyết mâu thuẫn hài hòa.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_16",
    "number": 16,
    "question": "Khi mẹ đang dặn dò em những lưu ý quan trọng trước khi đi cắm trại cùng lớp, hành vi lắng nghe lễ phép là gì?",
    "options": {
      "A": "Vừa nghe mẹ nói vừa chạy nhảy đùa nghịch và trả lời cộc lốc: \"Biết rồi, mẹ nói nhiều thế!\".",
      "B": "Đứng nghiêm túc lắng nghe mẹ dặn, thỉnh thoảng gật đầu vâng lời, hỏi lại những điều chưa rõ và nói: \"Dạ vâng, con nhớ rồi ạ, con cảm ơn mẹ!\".",
      "C": "Đóng chặt cửa phòng không cho mẹ nói nữa.",
      "D": "Giả vờ bị đau tai để không phải nghe lời dặn."
    },
    "answer": "B",
    "explanation": "Lắng nghe cha mẹ dặn dò bằng thái độ nghiêm túc và phản hồi tôn trọng thể hiện lòng hiếu thảo và ý thức tự giác chuẩn bị cho chuyến đi an toàn.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_17",
    "number": 17,
    "question": "Bạn thân của em vô tình làm mất chiếc tẩy bút chì mà em rất thích. Bạn đã đến xin lỗi em với vẻ mặt rất hối lỗi. Hành động đồng cảm là gì?",
    "options": {
      "A": "Mắng bạn một trận thật to cho bõ tức và đòi bạn đền chiếc tẩy mới đắt tiền hơn.",
      "B": "Hiểu rằng bạn chỉ vô ý làm mất chứ không cố tình, mỉm cười nói: \"Không sao đâu cậu ơi, chỉ là chiếc tẩy thôi mà, lần sau cậu chú ý giữ đồ hơn nhé!\" và vui vẻ chơi tiếp cùng bạn.",
      "C": "Nhận lời xin lỗi của bạn nhưng đi rủ các bạn khác tẩy chay bạn.",
      "D": "Tự ý lấy lại hộp bút của bạn để trừ nợ chiếc tẩy."
    },
    "answer": "B",
    "explanation": "Sự vị tha và thấu cảm trước lỗi lầm vô ý của bạn bè giúp gìn giữ tình bạn quý giá và xây dựng nhân cách bao dung cho học sinh.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_18",
    "number": 18,
    "question": "Đâu là một hành vi lắng nghe phản hồi (feedback) tích cực từ giáo viên khi em làm sai bài kiểm tra?",
    "options": {
      "A": "Vứt bài kiểm tra đi vì tức giận với điểm số.",
      "B": "Lắng nghe cô giáo phân tích lỗi sai trong bài làm, ghi chép lại cách giải đúng và cảm ơn cô vì đã hướng dẫn chi tiết giúp mình tiến bộ.",
      "C": "Nghĩ rằng cô giáo trù dập mình nên mới chấm điểm kém.",
      "D": "Khóc lóc bắt cô giáo phải chấm lại điểm cao cho mình."
    },
    "answer": "B",
    "explanation": "Đón nhận phản hồi sư phạm bằng thái độ cầu thị là chìa khóa giúp học sinh nhận thức được điểm cần cải thiện để không ngừng tiến bộ trong học tập.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_19",
    "number": 19,
    "question": "Tại sao việc sử dụng các \"Từ ngữ gây tổn thương\" (như chê bai ngoại hình, chửi bậy) lại là hành vi bị nghiêm cấm trong giao tiếp học đường?",
    "options": {
      "A": "Vì nói các từ đó sẽ làm đau họng người nói.",
      "B": "Vì chúng gây tổn thương tinh thần sâu sắc cho bạn bè, phá hủy tình bạn, tạo ra môi trường học đường độc hại và có thể dẫn đến bạo lực học đường.",
      "C": "Vì nói các từ đó sẽ bị trừ điểm học tập cá nhân.",
      "D": "Vì các từ đó rất khó phát âm đúng."
    },
    "answer": "B",
    "explanation": "Ngôn từ có sức mạnh rất lớn. Sử dụng ngôn từ độc hại gây tổn thương tâm lý nghiêm trọng cho học sinh. Cần giáo dục học sinh sử dụng ngôn từ tích cực, ái ngữ.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_20",
    "number": 20,
    "question": "Em thấy một bạn trong lớp khóc vì bị điểm kém trong bài kiểm tra môn Toán. Cách thể hiện sự đồng cảm lành mạnh là:",
    "options": {
      "A": "Đến trêu bạn: \"Ha ha học dốt thế bị điểm kém là đáng đời nhé!\".",
      "B": "Ngồi cạnh bạn, lắng nghe bạn tâm sự, vỗ vai động viên bạn và đề xuất: \"Đừng buồn cậu ơi, lần sau bọn mình cùng ôn tập nhé, có câu nào khó tớ sẽ chỉ cho cậu\".",
      "C": "Bỏ qua đi chỗ khác vì không phải việc của mình.",
      "D": "Mách cô giáo là bạn đang khóc làm ảnh hưởng không khí lớp."
    },
    "answer": "B",
    "explanation": "Đồng cảm đi liền với hành động hỗ trợ cụ thể (compassion in action) giúp học sinh xây dựng tình bạn gắn kết và củng cố tinh thần tương thân tương ái.",
    "topic": "CHỦ ĐỀ 2: KỸ NĂNG LẮNG NGHE & THẤU CẢM TRONG CÁC MỐI QUAN HỆ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_21",
    "number": 21,
    "question": "Khi bắt đầu làm việc nhóm để vẽ tranh cổ động bảo vệ môi trường, việc đầu tiên nhóm nên làm để hoạt động hiệu quả là gì?",
    "options": {
      "A": "Mỗi người tự vẽ một bức tranh theo ý mình rồi ghép lại.",
      "B": "Bầu ra nhóm trưởng để điều phối, thảo luận thống nhất mục tiêu chung, phân chia vai trò cụ thể và xây dựng nguyên tắc làm việc nhóm rõ ràng.",
      "C": "Tranh giành nhau xem ai được vẽ chính và ai phải đi giặt cọ vẽ.",
      "D": "Đợi đến sát giờ nộp bài mới bắt đầu làm việc."
    },
    "answer": "B",
    "explanation": "Khởi động nhóm bằng việc xác định mục tiêu, vai trò và nguyên tắc (group norm) là nền tảng cốt lõi giúp đội nhóm hoạt động ăn ý, khoa học và tránh xung đột về sau.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_22",
    "number": 22,
    "question": "Vai trò chính của một \"Nhóm trưởng\" (Leader) trong làm việc nhóm là gì?",
    "options": {
      "A": "Làm hết mọi công việc khó của nhóm và chịu phạt thay các bạn.",
      "B": "Ra lệnh áp đặt các bạn làm theo mọi ý muốn cá nhân của mình.",
      "C": "Lắng nghe ý kiến của mọi thành viên, điều phối phân công công việc công bằng theo điểm mạnh của mỗi bạn, đôn đốc tiến độ và khích lệ tinh thần cả nhóm.",
      "D": "Nhận toàn bộ công lao về mình khi nhóm đạt thành tích cao."
    },
    "answer": "C",
    "explanation": "Nhóm trưởng là người điều phối và hỗ trợ (facilitator) chứ không phải là người cai trị độc đoán. Sự lắng nghe và tôn trọng là chìa khóa của năng lực lãnh đạo trẻ tuổi.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_23",
    "number": 23,
    "question": "Trong buổi thảo luận nhóm, bạn A đưa ra một ý kiến phát biểu nhưng nói giọng hơi nhỏ và run rẩy vì xấu hổ. Em nên ứng xử thế nào để khuyến khích bạn?",
    "options": {
      "A": "Quát bạn: \"Nói to lên bạn ơi, nói nhỏ thế ai nghe được!\".",
      "B": "Tập trung lắng nghe bạn nói, mỉm cười khích lệ: \"Ý kiến của bạn A rất hay đấy! Bạn cứ bình tĩnh chia sẻ tiếp đi nhé, bọn mình đang nghe đây\".",
      "C": "Cắt ngang lời bạn để tự mình phát biểu cho nhanh.",
      "D": "Cười rúc rích trêu chọc sự nhút nhát của bạn."
    },
    "answer": "B",
    "explanation": "Khích lệ đồng đội (peer encouragement) tạo ra môi trường an toàn tâm lý, giúp các thành viên nhút nhát tự tin thể hiện năng lực và đóng góp cho tập thể.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_24",
    "number": 24,
    "question": "Bạn B trong nhóm được giao nhiệm vụ sưu tầm tranh ảnh nhưng đến hạn chót vẫn chưa hoàn thành vì máy in nhà bạn bị hỏng. Hành vi hợp tác tốt là gì?",
    "options": {
      "A": "Quát mắng bạn trước cả nhóm và đòi đuổi bạn ra khỏi nhóm.",
      "B": "Tìm hiểu khó khăn của bạn, đề xuất bạn gửi file ảnh qua điện thoại rồi mang đến trường nhờ máy in nhà bạn khác trong nhóm in hộ, cùng nhau hoàn thành nhiệm vụ.",
      "C": "Mách cô giáo để cô trừ điểm cá nhân của bạn B thật nặng.",
      "D": "Bỏ mặc phần việc của bạn B và chấp nhận nộp bài thiếu."
    },
    "answer": "B",
    "explanation": "Tinh thần đồng đội (collaborative problem solving) thể hiện qua việc cùng nhau tháo gỡ khó khăn phát sinh của thành viên vì mục tiêu chung của cả nhóm.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_25",
    "number": 25,
    "question": "Khi phân công công việc làm tập san của nhóm, em nhận thấy mình có thế mạnh viết chữ rất đẹp nhưng vẽ tranh hơi xấu. Em nên chủ động nhận phần việc nào?",
    "options": {
      "A": "Nhận nhiệm vụ vẽ tranh minh họa chính vì muốn thử thách bản thân dù làm ảnh hưởng chất lượng chung của nhóm.",
      "B": "Chủ động đề xuất: \"Tớ viết chữ đẹp nên tớ xin nhận nhiệm vụ nắn nót viết phần nội dung chữ cho tập san nhé, còn phần vẽ tranh nhờ bạn vẽ đẹp hơn vẽ giúp\".",
      "C": "Không nhận việc gì cả, để các bạn tự phân chia công việc.",
      "D": "Ép bạn viết chữ xấu hơn phải viết thay mình."
    },
    "answer": "B",
    "explanation": "Tự nhận thức điểm mạnh của bản thân và chủ động nhận vai trò phù hợp là nguyên tắc phân bổ nhân sự hiệu quả nhất trong làm việc nhóm.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_26",
    "number": 26,
    "question": "Đâu là một \"Nguyên tắc vàng\" giúp duy trì sự hòa thuận và hiệu quả khi làm việc nhóm?",
    "options": {
      "A": "Chỉ làm theo ý kiến của bạn học giỏi nhất nhóm.",
      "B": "Tôn trọng sự khác biệt, lắng nghe chủ động, chịu trách nhiệm về phần việc được giao và giải quyết mâu thuẫn bằng thương lượng, hòa giải.",
      "C": "Tránh thảo luận tranh luận để không xảy ra cãi nhau.",
      "D": "Chia nhỏ công việc rồi mạnh ai nấy làm, không liên quan đến nhau."
    },
    "answer": "B",
    "explanation": "Đây là tổng hợp các nguyên tắc cốt lõi của làm việc nhóm theo tiêu chuẩn giáo dục kỹ năng sống hiện đại, giúp học sinh phát triển năng lực hợp tác.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_27",
    "number": 27,
    "question": "Khi thảo luận nhóm, hai bạn trong nhóm xảy ra tranh cãi nảy lửa về màu sắc chủ đạo của bức tranh cổ động lớp học. Em nên hòa giải thế nào?",
    "options": {
      "A": "Cổ vũ cho hai bạn cãi nhau to hơn xem ai thắng.",
      "B": "Đứng về phía bạn thân của mình bất kể bạn nói đúng hay sai.",
      "C": "Đề nghị hai bạn dừng tranh cãi để bình tĩnh, cùng phân tích ưu nhược điểm của cả hai màu sắc đề xuất, và tổ chức biểu quyết lấy ý kiến số đông của cả nhóm.",
      "D": "Bỏ mặc hai bạn tự giải quyết mâu thuẫn bằng đánh nhau."
    },
    "answer": "C",
    "explanation": "Kỹ năng hòa giải xung đột nhóm yêu cầu người trung gian giữ thái độ khách quan, hướng các bên vào giải pháp thương lượng hòa bình dựa trên lợi ích chung.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_28",
    "number": 28,
    "question": "Đâu là hành vi SAI khi tham gia thảo luận làm việc nhóm?",
    "options": {
      "A": "Chủ động chuẩn bị ý kiến viết ra giấy trước buổi họp.",
      "B": "Tự ý thay đổi nội dung dự án chung của cả nhóm mà không thông qua thảo luận và đồng ý của các thành viên khác.",
      "C": "Lắng nghe tôn trọng ý kiến phản biện của bạn khác.",
      "D": "Hoàn thành phần việc được giao đúng thời hạn cam kết."
    },
    "answer": "B",
    "explanation": "Làm việc nhóm yêu cầu sự đồng thuận và minh bạch thông tin. Tự ý hành động cá nhân phá vỡ tính thống nhất và gây bất bình trong tập thể.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_29",
    "number": 29,
    "question": "Khi nhóm đạt giải Nhất cuộc thi làm lồng đèn của trường, thái độ ứng xử đúng đắn của nhóm trưởng là gì?",
    "options": {
      "A": "Tuyên bố trước toàn trường: \"Giải thưởng này hoàn toàn là nhờ công sức to lớn của mình\".",
      "B": "Cảm ơn ban tổ chức và khẳng định giải thưởng là kết quả của sự nỗ lực, đoàn kết và đóng góp nhiệt tình của toàn thể các thành viên trong nhóm.",
      "C": "Chia phần thưởng nhiều nhất cho mình và các bạn thân, bỏ qua các bạn khác.",
      "D": "Chê bai lồng đèn của các lớp khác làm quá xấu."
    },
    "answer": "B",
    "explanation": "Khen ngợi và ghi nhận đóng góp của tập thể (credit sharing) giúp củng cố tinh thần đoàn kết, tạo sự gắn bó và động lực cống hiến cho các dự án tương lai.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_30",
    "number": 30,
    "question": "Một thành viên trong nhóm lười biếng, thường xuyên đi muộn và không làm bài tập được giao. Nhóm nên giải quyết thế nào?",
    "options": {
      "A": "Tẩy chay bạn hoàn toàn và nói xấu bạn với các nhóm khác.",
      "B": "Nhóm trưởng và các thành viên gặp riêng bạn, lắng nghe khó khăn của bạn, nhắc nhở bạn về nguyên tắc chung đã cam kết và cùng hỗ trợ bạn hoàn thành phần việc nhỏ phù hợp.",
      "C": "Làm hộ toàn bộ phần việc cho bạn để lấy điểm nhóm cao.",
      "D": "Mắng mỏ bạn thậm tệ trước cả lớp học để bạn biết xấu hổ."
    },
    "answer": "B",
    "explanation": "Giải quyết vấn đề thành viên lười biếng cần sự kết hợp giữa tính kỷ luật (nhắc nhở nguyên tắc) và tinh thần hỗ trợ đồng cảm, tạo cơ hội cho bạn sửa sai.",
    "topic": "CHỦ ĐỀ 3: LÀM VIỆC NHÓM & HỢP TÁC HIỆU QUẢ",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_31",
    "number": 31,
    "question": "Một bài thuyết trình giới thiệu bản thân ấn tượng trước lớp cần có dàn ý gồm 3 phần chính nào?",
    "options": {
      "A": "Mở đầu (Lời chào, tên tuổi, sở thích); Thân bài (Điểm mạnh nổi bật, ước mơ tương lai, trải nghiệm thú vị); Kết thúc (Lời chúc, lời cảm ơn và kêu gọi tương tác).",
      "B": "Chỉ cần đọc to tên mình rồi đi xuống.",
      "C": "Kể chi tiết toàn bộ lịch sử gia đình từ ông bà tổ tiên đến nay.",
      "D": "Đọc bảng điểm học tập cá nhân từ lớp 1 đến nay."
    },
    "answer": "A",
    "explanation": "Cấu trúc bài giới thiệu bản thân 3 phần giúp học sinh trình bày mạch lạc, logic, tự tin thể hiện nét riêng cá nhân và tạo kết nối tốt với người nghe.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_32",
    "number": 32,
    "question": "Em muốn thuyết phục bố mẹ cho mình tham gia khóa học bơi vào mùa hè này. Cách thuyết phục nào thể hiện kỹ năng giao tiếp tốt và hiệu quả?",
    "options": {
      "A": "Khóc lóc, ăn vạ, bỏ ăn cơm để bắt bố mẹ phải đăng ký ngay lập tức.",
      "B": "Chuẩn bị lý lẽ thuyết phục: Nêu rõ lợi ích của việc học bơi (nâng cao sức khỏe, phòng chống đuối nước, tự vệ bản thân) và đề xuất thời gian học hợp lý không ảnh hưởng việc học văn hóa.",
      "C": "So sánh bắt đền bố mẹ: \"Bố mẹ bạn A cho bạn ấy đi học bơi rồi, bố mẹ không thương con bằng bố mẹ bạn A\".",
      "D": "Tự ý lấy tiền tiết kiệm của bố mẹ đi đăng ký học bơi một mình."
    },
    "answer": "B",
    "explanation": "Thuyết phục dựa trên lý lẽ khoa học, lợi ích thực tế và thái độ tôn trọng (reasoned persuasion) có tỷ lệ thành công cao nhất và thể hiện sự trưởng thành của học sinh.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_33",
    "number": 33,
    "question": "Kỹ năng \"Quyết đoán\" (Being Assertive) được hiểu như thế nào trong giao tiếp hàng ngày?",
    "options": {
      "A": "Là thái độ nhút nhát, luôn đồng ý với tất cả ý kiến của người khác kể cả khi mình bị chịu thiệt thòi.",
      "B": "Là thái độ hung hăng, luôn bắt người khác phải nghe theo ý mình bằng bạo lực hoặc quát mắng.",
      "C": "Là sự can đảm bày tỏ ý kiến, nhu cầu, cảm xúc của bản thân một cách thẳng thắn, trung thực, tự tin nhưng vẫn hoàn toàn tôn trọng người khác.",
      "D": "Là việc im lặng không nói gì để tránh mọi cuộc tranh cãi."
    },
    "answer": "C",
    "explanation": "Quyết đoán (assertiveness) là trạng thái giao tiếp lành mạnh nhất, trung hòa giữa thụ động (passive) và hung hăng (aggressive), giúp học sinh tự bảo vệ quyền lợi cá nhân văn minh.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_34",
    "number": 34,
    "question": "Trong giờ học Toán, em cảm thấy rất buồn đi vệ sinh. Hành vi thể hiện sự quyết đoán, tự tin là gì?",
    "options": {
      "A": "Cố gắng nhịn tiểu suốt cả tiết học vì xấu hổ không dám giơ tay xin phép.",
      "B": "Ngồi thẳng lưng, giơ tay xin phát biểu tự tin, nhìn thẳng vào thầy/cô giáo và nói rõ ràng bằng giọng tôn trọng: \"Thưa thầy/cô, em xin phép được ra ngoài đi vệ sinh một chút ạ!\".",
      "C": "Tự ý đứng dậy chạy vụt ra ngoài cửa lớp không nói lời nào.",
      "D": "Hét to lên giữa lớp học là mình sắp tè ra quần."
    },
    "answer": "B",
    "explanation": "Bày tỏ nhu cầu sinh lý chính đáng một cách tự tin, rõ ràng và đúng quy cách (giơ tay xin phép) giúp bảo vệ sức khỏe học sinh và tôn trọng trật tự lớp học.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_35",
    "number": 35,
    "question": "Khi em thuyết trình về chủ đề \"Biến đổi khí hậu toàn cầu\", phi ngôn từ nào giúp bài thuyết trình tăng tính thuyết phục nhất?",
    "options": {
      "A": "Giọng nói đều đều như ru ngủ, mắt nhìn lên trần nhà liên tục.",
      "B": "Giọng nói rõ ràng, có điểm nhấn cao thấp, mắt quét đều nhìn vào các bạn dưới lớp (eye-contact), tư thế đứng thẳng cân bằng hai chân và sử dụng cử chỉ tay mô tả.",
      "C": "Đứng khoanh tay trước ngực và đọc nguyên văn chữ trên slide trình chiếu.",
      "D": "Đi lại liên tục không ngừng nghỉ trên sân khấu để tạo sự năng động."
    },
    "answer": "B",
    "explanation": "Sự kết hợp phi ngôn từ tự tin giúp truyền tải năng lượng tích cực, giữ chân khán giả tập trung lắng nghe và thể hiện sự làm chủ sân khấu của người thuyết trình.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_36",
    "number": 36,
    "question": "Một người bạn rủ em trốn học tiết tiếng Anh để đi chơi điện tử. Hành vi ứng xử quyết đoán của em là gì?",
    "options": {
      "A": "Đồng ý đi theo vì sợ bạn giận dỗi và tẩy chay mình.",
      "B": "Kiên quyết từ chối: \"Không, tớ sẽ không trốn học đâu vì học tiếng Anh rất quan trọng và tớ không muốn vi phạm nội quy của trường\" và khuyên bạn nên ở lại lớp học bài.",
      "C": "Không nói gì nhưng âm thầm trốn học cùng bạn.",
      "D": "Mắng bạn thậm tệ là đồ lười biếng học hành rồi đi báo cô giáo."
    },
    "answer": "B",
    "explanation": "Quyết đoán từ chối những lời rủ rê sai trái (refusal skill) giúp học sinh bảo vệ bản thân khỏi các thói quen xấu và xây dựng lập trường kiên định vững vàng.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_37",
    "number": 37,
    "question": "Khi chuẩn bị lý lẽ cho một bài thuyết phục bạn cùng lớp tham gia phong trào \"Nuôi heo đất giúp bạn nghèo vượt khó\", đâu là lý lẽ thuyết phục nhất?",
    "options": {
      "A": "\"Nếu cậu không nuôi heo đất thì tớ sẽ báo cô giáo trừ điểm hạnh kiểm của cậu\".",
      "B": "\"Chỉ với 2.000 đồng tiết kiệm mỗi ngày (bằng một nửa viên kẹo), chúng ta có thể giúp một bạn nghèo mua sách vở đi học. Sự sẻ chia nhỏ này sẽ mang lại niềm vui lớn cho bạn và cả tụi mình\".",
      "C": "\"Nuôi heo đất để tụi mình được khen ngợi trước toàn trường cho oai\".",
      "D": "\"Heo đất làm bằng gốm rất đẹp, mua về trang trí bàn học rất xinh\"."
    },
    "answer": "B",
    "explanation": "Thuyết phục hiệu quả nhất khi chỉ ra ý nghĩa nhân văn sâu sắc của hành động, khơi dậy lòng nhân ái tự nhiên và đề xuất mức đóng góp khả thi, vừa sức với đối tượng.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_38",
    "number": 38,
    "question": "Bố mẹ muốn em học thêm môn đàn Piano nhưng em lại đam mê và muốn học vẽ tranh. Em nên thuyết phục bố mẹ thế nào để đạt đồng thuận?",
    "options": {
      "A": "Đập phá đồ đạc trong nhà để phản đối việc học đàn.",
      "B": "Bày tỏ tình cảm yêu thích môn vẽ của mình, chia sẻ những bức tranh em tự vẽ rất đẹp, xin bố mẹ cho thử học vẽ một học kỳ và cam kết vẫn hoàn thành tốt bài học văn hóa ở trường.",
      "C": "Cứ đi học đàn theo ý bố mẹ nhưng cố tình không tập luyện gì để bố mẹ chán nản.",
      "D": "Nói dối bố mẹ là đi học đàn nhưng tự ý trốn sang lớp học vẽ."
    },
    "answer": "B",
    "explanation": "Giao tiếp thuyết phục gia đình đòi hỏi sự chân thành, đưa ra bằng chứng năng khiếu cụ thể và cam kết trách nhiệm để nhận được sự tin tưởng và ủng hộ từ cha mẹ.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_39",
    "number": 39,
    "question": "Đâu là tư thế đứng chuẩn giúp học sinh tiểu học tự tin đứng trước đám đông thuyết trình?",
    "options": {
      "A": "Hai chân đứng chụm lại, vai rụt xuống và đầu nghiêng sang một bên.",
      "B": "Hai chân đứng rộng bằng vai, trọng tâm cơ thể dồn đều vào hai bàn chân, lưng thẳng, ngực mở rộng thoải mái và đầu ngẩng cao tự nhiên.",
      "C": "Đứng vắt chéo chân và tựa lưng vào tường lớp học.",
      "D": "Đứng rung đùi liên tục và cúi nhìn mũi giày."
    },
    "answer": "B",
    "explanation": "Tư thế đứng cân bằng (anchoring posture) tạo nền móng vững chắc giúp giải tỏa cảm giác run chân, mở rộng lồng ngực để phát âm to rõ và truyền tải sự tự tin mạnh mẽ đến khán giả.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_40",
    "number": 40,
    "question": "Khi em bị một bạn lớp lớn đe dọa đòi tiền tiêu vặt ở khu vực nhà vệ sinh trường học. Hành vi quyết đoán và an toàn là gì?",
    "options": {
      "A": "Khóc lóc đưa hết tiền cho bạn và giữ bí mật câu chuyện.",
      "B": "Kiên quyết nói bằng giọng dứt khoát: \"Tớ không đưa tiền cho cậu đâu!\" rồi nhanh chóng chạy ra khu vực sân trường đông người và báo ngay lập tức cho bác bảo vệ hoặc thầy cô giáo biết.",
      "C": "Rủ thêm bạn bè đến đánh nhau trả thù bạn lớp lớn đó.",
      "D": "Đứng im chịu đựng để bạn lục túi cướp tiền."
    },
    "answer": "B",
    "explanation": "Quyết đoán bảo vệ tài sản và sự an toàn của mình bằng cách phản kháng bằng lời dứt khoát, di chuyển đến nơi an toàn và báo cáo ngay lập tức cho người có thẩm quyền xử lý hành vi bắt nạt học đường.",
    "topic": "CHỦ ĐỀ 4: THUYẾT TRÌNH, THUYẾT PHỤC & QUYẾT ĐOÁN",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_41",
    "number": 41,
    "question": "Khi em và một bạn trong lớp có sự xích mích dẫn đến cãi vã lớn về việc ai là người được mượn cuốn truyện tranh trước ở thư viện. Cách xử lý hòa bình là gì?",
    "options": {
      "A": "Giật cuốn truyện tranh xé đôi để mỗi người lấy một nửa.",
      "B": "Giữ bình tĩnh, dừng cãi vã, đề xuất giải pháp thương lượng: \"Tớ sẽ đọc trước trong 1 ngày rồi đưa cậu đọc tiếp, hoặc ngược lại cậu đọc trước rồi đưa tớ mượn nhé\".",
      "C": "Đánh nhau xem ai mạnh hơn thì người đó được đọc trước.",
      "D": "Đi nói xấu bạn với cô thủ thư để cô không cho bạn mượn truyện nữa."
    },
    "answer": "B",
    "explanation": "Giải quyết xung đột hòa bình (conflict resolution) đòi hỏi sự nhường nhịn, kiểm soát cảm xúc bốc đồng và đề xuất giải pháp chia sẻ lợi ích công bằng (win-win).",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_42",
    "number": 42,
    "question": "Ở nhà, em và em trai tranh giành nhau chiếc điều khiển từ xa để xem kênh tivi yêu thích. Cách ứng xử thể hiện sự nhường nhịn và trách nhiệm là gì?",
    "options": {
      "A": "Giật điều khiển ném mạnh xuống đất cho hỏng hẳn để không ai được xem.",
      "B": "Đánh em trai khóc lóc để giành quyền chọn kênh.",
      "C": "Thỏa thuận với em trai chia thời gian xem (ví dụ: em trai xem hoạt hình 30 phút, sau đó đến lượt em xem chương trình khoa học 30 phút), hoặc cùng tìm chương trình cả hai anh em đều thích xem chung.",
      "D": "Chạy đi khóc lóc bắt đền bố mẹ phạt em trai."
    },
    "answer": "C",
    "explanation": "Mâu thuẫn gia đình giữa anh chị em rất phổ biến. Việc hướng dẫn các em tự thỏa thuận phân chia thời gian giúp hình thành kỹ năng đàm phán và tinh thần nhường nhịn gia đình tốt.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_43",
    "number": 43,
    "question": "Trong lúc làm việc nhóm, bạn A kiên quyết không đồng ý với kết quả thảo luận của cả nhóm và bắt đầu tỏ thái độ giận dỗi, im lặng. Nhóm trưởng nên làm gì?",
    "options": {
      "A": "Tẩy chay bạn A khỏi nhóm và làm bài tiếp.",
      "B": "Tổ chức họp nhóm ngắn, lắng nghe bạn A trình bày lý do tại sao chưa đồng ý, thảo luận phân tích ý kiến của bạn một cách khách quan để tìm ra điểm hợp lý bổ sung vào bài làm chung.",
      "C": "Mắng mỏ bạn A là đồ ích kỷ phá hoại nhóm.",
      "D": "Hủy bỏ kết quả thảo luận cũ để làm theo hoàn toàn ý kiến bạn A."
    },
    "answer": "B",
    "explanation": "Hòa giải xung đột nhóm đòi hỏi sự tôn trọng ý kiến thiểu số, lắng nghe nguyên nhân sâu xa của sự giận dỗi để gắn kết các thành viên lại với nhau vì mục tiêu chung.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_44",
    "number": 44,
    "question": "Đâu là bước ĐẦU TIÊN trong quy trình giải quyết xung đột hòa bình?",
    "options": {
      "A": "Đưa ra các hình phạt cho người làm sai.",
      "B": "Hạ hỏa (giữ bình tĩnh) bằng cách hít thở sâu, dừng mọi hành vi cãi vã hoặc xô xát chân tay.",
      "C": "Mời người lớn vào phân xử đúng sai.",
      "D": "Đề xuất các giải pháp đền bù thiệt hại."
    },
    "answer": "B",
    "explanation": "Khi xung đột xảy ra, cảm xúc tức giận làm mất đi khả năng lý trí. Bước hạ hỏa giữ bình tĩnh là điều kiện tiên quyết để có thể đối thoại và giải quyết vấn đề sau đó.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_45",
    "number": 45,
    "question": "Tại sao việc sử dụng bạo lực (đánh nhau, đẩy ngã bạn) không bao giờ là cách giải quyết xung đột đúng đắn?",
    "options": {
      "A": "Vì đánh nhau sẽ làm rách quần áo đồng phục đi học.",
      "B": "Vì bạo lực gây chấn thương thể xác, làm tổn thương tâm lý nghiêm trọng, vi phạm kỷ luật nhà trường và khiến mâu thuẫn ngày càng sâu sắc hơn chứ không giải quyết tận gốc vấn đề.",
      "C": "Vì đánh bạn sẽ bị các bạn lớn tuổi hơn đánh lại.",
      "D": "Vì đánh nhau sẽ tốn tiền của bố mẹ đưa đi bệnh viện khám."
    },
    "answer": "B",
    "explanation": "Giáo dục học sinh phi bạo lực (non-violence) là nguyên tắc cốt lõi của UNESCO và Lions Quest. Mọi mâu thuẫn đều có thể và cần được giải quyết bằng đối thoại hòa bình.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_46",
    "number": 46,
    "question": "Em thấy hai bạn thân của mình ở lớp đang giận nhau và không nói chuyện với nhau suốt 3 ngày liền. Em muốn làm cầu nối hòa giải. Em nên làm thế nào?",
    "options": {
      "A": "Đi nói xấu bạn này với bạn kia để hai bạn ghét nhau hẳn.",
      "B": "Chọn một buổi ra chơi thích hợp, rủ cả hai bạn cùng ngồi lại nói chuyện, lắng nghe chia sẻ từ hai phía một cách khách quan và giúp hai bạn nhận ra hiểu lầm nhỏ để bắt tay làm hòa.",
      "C": "Đứng về phía bạn chơi thân hơn để tẩy chay bạn còn lại.",
      "D": "Mách cô giáo để cô phạt cả hai bạn tội không đoàn kết."
    },
    "answer": "B",
    "explanation": "Kỹ năng làm cầu nối hòa giải (peer mediation) yêu cầu thái độ trung lập, chân thành giúp các bên nhìn nhận lại vấn đề một cách thấu cảm để khôi phục mối quan hệ tốt đẹp.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_47",
    "number": 47,
    "question": "Khi em làm sai khiến dự án làm báo tường của nhóm bị chấm điểm thấp, các bạn đổ lỗi và chỉ trích em. Hành vi xử lý xung đột tích cực là:",
    "options": {
      "A": "Quát lại các bạn và bỏ học nhóm luôn.",
      "B": "Giữ bình tĩnh, nhận lỗi chân thành: \"Tớ xin lỗi cả nhóm vì phần việc của tớ làm chưa tốt. Lần sau tớ sẽ cố gắng chuẩn bị kỹ hơn và nhờ các cậu hỗ trợ kiểm tra lại nhé\" để xoa dịu cơn giận của nhóm.",
      "C": "Đổ lỗi cho máy tính hỏng hoặc bố mẹ bắt làm việc nhà nên không có thời gian làm bài.",
      "D": "Đi nói xấu các thành viên khác để dìm điểm của họ xuống."
    },
    "answer": "B",
    "explanation": "Thừa nhận sai sót một cách thẳng thắn giúp tháo ngòi nổ tức giận của đồng đội, ngăn ngừa mâu thuẫn nội bộ leo thang và giữ vững tinh thần hợp tác nhóm.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_48",
    "number": 48,
    "question": "Em vô ý làm rơi hộp bút của bạn làm vỡ chiếc thước kẻ yêu thích bên trong. Bạn tức giận quát mắng em thậm tệ. Phản ứng nào thể hiện kiểm soát xung đột tốt?",
    "options": {
      "A": "Quát mắng lại bạn: \"Có cái thước rẻ tiền thôi làm gì mà ghê thế!\".",
      "B": "Nhìn thẳng vào mắt bạn, lắng nghe bạn xả giận, bình tĩnh xin lỗi: \"Tớ vô ý quá làm hỏng thước của cậu rồi. Cậu cho tớ xin lỗi nhé! Tớ sẽ mua chiếc thước mới đền lại cậu giống hệt chiếc này nha\".",
      "C": "Ném chiếc thước gãy vào sọt rác và bỏ đi chỗ khác chơi.",
      "D": "Khóc lóc bắt đền ngược lại bạn vì bạn làm mình sợ hãi."
    },
    "answer": "B",
    "explanation": "Ứng xử xoa dịu (de-escalation) khi mình làm sai giúp ngăn chặn mâu thuẫn bùng phát thành đánh nhau và thể hiện trách nhiệm bồi thường thiệt hại văn minh.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_49",
    "number": 49,
    "question": "Trong gia đình, khi xảy ra mâu thuẫn giữa em và anh trai về việc phân công dọn dẹp phòng ngủ, ai là người phù hợp nhất để hướng dẫn giải quyết xung đột?",
    "options": {
      "A": "Các bạn hàng xóm cùng xóm.",
      "B": "Bố mẹ em - vì bố mẹ có trách nhiệm và tình yêu thương công bằng để hướng dẫn hai anh em thỏa thuận giải quyết hòa bình.",
      "C": "Người lạ quen trên mạng xã hội.",
      "D": "Không cần ai, hai anh em cứ đánh nhau tự giải quyết."
    },
    "answer": "B",
    "explanation": "Bố mẹ là người giữ vai trò trọng tài gia đình, hướng dẫn các con phương pháp giải quyết mâu thuẫn một cách công bằng và tình cảm nhất.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Giao_tiếp_&_Hợp_tác_xã_hội_50",
    "number": 50,
    "question": "Khi xung đột trong lớp học đã leo thang đến mức các bạn bắt đầu xô xát, xô đẩy nhau chuẩn bị đánh nhau lớn. Hành động khẩn cấp và an toàn nhất của em là gì?",
    "options": {
      "A": "Nhảy vào tham gia đánh nhau để bảo vệ bạn thân của mình.",
      "B": "Đứng ngoài cổ vũ, quay video để đăng lên mạng xã hội.",
      "C": "Nhanh chóng chạy đi báo ngay cho giáo viên chủ nhiệm, bác bảo vệ trường hoặc bất kỳ người lớn nào gần đó để can thiệp kịp thời.",
      "D": "Bỏ chạy về nhà trốn học tiết tiếp theo."
    },
    "answer": "C",
    "explanation": "Khi có dấu hiệu bạo lực vật lý xảy ra, học sinh cần ưu tiên báo cáo khẩn cấp cho người lớn có thẩm quyền để can thiệp an toàn, tránh việc tự ý can thiệp trực tiếp gây thương tích nguy hiểm.",
    "topic": "CHỦ ĐỀ 5: GIẢI QUYẾT XUNG ĐỘT & HÒA GIẢI",
    "group": "Giao tiếp & Hợp tác xã hội"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_1",
    "number": 1,
    "question": "Trước bữa ăn tối, mẹ đang bận nấu thức ăn trong bếp. Hành động nào thể hiện sự tự giác giúp đỡ gia đình?",
    "options": {
      "A": "Ngồi chơi điện thoại đợi mẹ dọn cơm lên rồi vào ăn.",
      "B": "Chủ động xếp bát đũa lên bàn ăn, lau sạch bàn và gọi mọi người chuẩn bị vào ăn cơm.",
      "C": "Ra ngoài ngõ chơi bóng đá cùng các bạn xóm.",
      "D": "Hét to giục mẹ nấu ăn nhanh lên vì mình đang đói."
    },
    "answer": "B",
    "explanation": "Chuẩn bị bàn ăn là công việc gia đình đơn giản, vừa sức giúp học sinh rèn luyện tính tự giác, tinh thần sẻ chia và trách nhiệm với cuộc sống gia đình.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_2",
    "number": 2,
    "question": "Mẹ bận đi chợ và nhờ em ở nhà trông em bé (2 tuổi) giúp mẹ trong 30 phút. Em nên làm gì để đảm bảo an toàn cho em bé?",
    "options": {
      "A": "Bật tivi cho em bé xem một mình rồi đi vào phòng riêng chơi game.",
      "B": "Cất các đồ vật nhỏ sắc nhọn, ổ cắm điện xa tầm tay em; cùng em chơi các trò chơi an toàn (như xếp hình gỗ) và luôn quan sát em trong tầm mắt.",
      "C": "Cho em tự do bò nghịch quanh khu vực bếp nấu ăn.",
      "D": "Nhờ bạn hàng xóm sang trông hộ để mình đi đá bóng."
    },
    "answer": "B",
    "explanation": "Trông em đòi hỏi trách nhiệm cao. Việc loại bỏ các tác nhân gây nguy hiểm và luôn giữ trẻ trong tầm mắt giúp phòng ngừa tai nạn thương tích đáng tiếc cho trẻ nhỏ.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_3",
    "number": 3,
    "question": "Bố mẹ nhờ em phân loại quần áo bẩn trước khi bỏ vào máy giặt. Cách phân loại quần áo đúng cách là gì?",
    "options": {
      "A": "Bỏ tất cả quần áo trắng, quần áo màu và tất bẩn lộn xộn vào giặt chung một lượt.",
      "B": "Tách riêng quần áo màu trắng để tránh bị lem màu; kiểm tra các túi quần túi áo để lấy hết đồ vật bên trong ra trước khi bỏ vào lồng giặt.",
      "C": "Chỉ giặt quần áo của mình, không quan tâm đến đồ dùng của bố mẹ.",
      "D": "Đổ thật nhiều nước tẩy trực tiếp lên đống quần áo màu đen."
    },
    "answer": "B",
    "explanation": "Phân loại quần áo giúp bảo vệ chất lượng trang phục không bị loang màu, đồng thời việc kiểm tra túi áo quần giúp tránh làm hỏng máy giặt và tài sản cá nhân bên trong.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_4",
    "number": 4,
    "question": "Sau khi bữa ăn gia đình kết thúc, hành động dọn dẹp văn minh nào em nên thực hiện?",
    "options": {
      "A": "Đứng dậy đi chơi ngay lập tức và để bát đĩa bẩn trên bàn cho mẹ dọn.",
      "B": "Giúp bố mẹ thu dọn bát đĩa bẩn mang vào bồn rửa, lau sạch bàn ăn và cất ghế gọn gàng vào vị trí cũ.",
      "C": "Vứt đũa muỗng lộn xộn xuống sàn nhà cho nhanh sạch.",
      "D": "Dùng khăn lau bàn gạt hết thức ăn thừa xuống đất."
    },
    "answer": "B",
    "explanation": "Tự giác tham gia dọn dẹp sau ăn thể hiện sự tôn trọng công sức nấu ăn của gia đình và thói quen giữ gìn vệ sinh chung sạch sẽ.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_5",
    "number": 5,
    "question": "Bố mua một túi cam tươi và thịt heo sống về. Em giúp bố cất đồ vào tủ lạnh như thế nào để đảm bảo an toàn vệ sinh thực phẩm?",
    "options": {
      "A": "Để thịt sống chưa rửa bọc nilon chung ngăn với cam tươi ăn liền.",
      "B": "Thịt sống rửa sạch, cho vào hộp kín để ngăn đông lạnh; cam tươi rửa sạch, để vào ngăn mát tủ lạnh phía dưới.",
      "C": "Vứt tất cả lộn xộn ngoài vỏ hộp giấy ở hành lang cho thoáng mát.",
      "D": "Để thịt sống ở ngăn cánh tủ lạnh cạnh bình nước uống."
    },
    "answer": "B",
    "explanation": "Sắp xếp tủ lạnh khoa học ngăn ngừa sự lây nhiễm chéo vi khuẩn nguy hiểm từ thực phẩm tươi sống sang trái cây ăn trực tiếp, bảo vệ sức khỏe gia đình.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_6",
    "number": 6,
    "question": "Khi em phụ mẹ lau dọn nhà cửa cuối tuần và vô ý làm đổ xô nước lau sàn ra sàn gỗ phòng khách. Cách chịu trách nhiệm tốt là gì?",
    "options": {
      "A": "Giả vờ không biết, chạy trốn đi chỗ khác chơi để không bị mắng.",
      "B": "Đi đổ lỗi cho con mèo nhảy qua làm đổ nước.",
      "C": "Bình tĩnh lấy giẻ lau khô thấm hút nước ngay lập tức để tránh làm hỏng sàn gỗ, xin lỗi mẹ và dọn dẹp sạch sẽ lại khu vực đó.",
      "D": "Khóc lóc bắt mẹ phải lau dọn đống nước đổ đó hộ mình."
    },
    "answer": "C",
    "explanation": "Chịu trách nhiệm trước sự cố do mình gây ra thể hiện tính trung thực, dũng cảm và biết cách xử lý vấn đề thực tế kịp thời.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_7",
    "number": 7,
    "question": "Bố mẹ bận việc đồng áng/công sở về muộn và chưa kịp nấu cơm tối. Em là học sinh lớp 5, em nên làm gì?",
    "options": {
      "A": "Nằm giận dỗi khóc lóc vì đói bụng mà không được ăn cơm đúng giờ.",
      "B": "Tự lập cắm cơm giúp bố mẹ, nhặt rau sạch và chuẩn bị sẵn nguyên liệu nấu ăn để khi bố mẹ về có thể nấu nhanh hơn.",
      "C": "Tự ý lấy tiền đi mua đồ ăn nhanh đắt tiền ngoài đường về ăn một mình.",
      "D": "Gọi điện thoại trách mắng bố mẹ đi làm về muộn."
    },
    "answer": "B",
    "explanation": "Tự lập hỗ trợ bố mẹ khi gia đình gặp khó khăn về thời gian thể hiện tinh thần trách nhiệm cao, thấu hiểu khó khăn và yêu thương gia đình bằng hành động.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_8",
    "number": 8,
    "question": "Khi trông em bé, em bé đòi nghịch chơi với chiếc bật lửa gas hoặc bao diêm. Em nên ứng xử thế nào?",
    "options": {
      "A": "Cho em chơi thoải mái vì nghĩ em chỉ xem ngọn lửa cho vui.",
      "B": "Kiên quyết không cho em chơi, giải thích nhẹ nhàng: \"Cái này nóng nguy hiểm lắm em ơi!\", cất bật lửa lên cao tầm tay em và lấy đồ chơi an toàn khác cho em chơi.",
      "C": "Tức giận quát mắng rồi đánh em khóc vì tội đòi nghịch dại.",
      "D": "Châm lửa cho em tự chạm tay vào để biết nóng lần sau không đòi nữa."
    },
    "answer": "B",
    "explanation": "Trẻ nhỏ chưa có nhận thức về nguy cơ cháy nổ. Người trông trẻ phải bảo vệ em tuyệt đối khỏi các tác nhân gây bỏng, tai nạn bằng thái độ ôn hòa nhưng dứt khoát.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_9",
    "number": 9,
    "question": "Tại sao việc phân loại quần áo trước khi giặt lại giúp tiết kiệm tài chính cho gia đình?",
    "options": {
      "A": "Vì giặt chung sẽ làm máy giặt nhanh bị hỏng hóc hơn.",
      "B": "Vì giúp ngăn chặn sự lem màu làm hỏng quần áo trắng mới, từ đó tránh việc phải mua quần áo mới thay thế lãng phí.",
      "C": "Vì máy giặt phân loại đồ sẽ quay nhanh hơn, tiết kiệm điện năng.",
      "D": "Không giúp ích gì về kinh tế gia đình."
    },
    "answer": "B",
    "explanation": "Tiết kiệm tài chính gia đình bắt nguồn từ những thói quen sinh hoạt cẩn thận, bảo quản đồ dùng cá nhân và gia đình tránh hư hỏng hao mòn không đáng có.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_10",
    "number": 10,
    "question": "Mẹ giao cho em nhiệm vụ lau dọn bàn học của mình sạch sẽ mỗi sáng Chủ Nhật. Hành động tự giác là:",
    "options": {
      "A": "Đợi mẹ nhắc nhở nhiều lần, mắng mỏ mới chịu đi làm.",
      "B": "Tự canh giờ sáng Chủ Nhật, chủ động chuẩn bị khăn lau, dọn dẹp sách vở và lau bàn sạch sẽ ngăn nắp mà không cần mẹ phải nhắc nhở.",
      "C": "Nhờ chị gái lau hộ rồi xin mẹ tiền tiêu vặt.",
      "D": "Chỉ lau bụi một góc nhỏ của bàn nơi để máy tính chơi game."
    },
    "answer": "B",
    "explanation": "Tự giác (self-motivation) hoàn thành công việc được giao đúng cam kết là biểu hiện của người có ý thức kỷ luật bản thân tốt, không cần giám sát liên tục.",
    "topic": "CHỦ ĐỀ 1: TRÁCH NHIỆM GIÚP ĐỠ GIA ĐÌNH & VIỆC NHÀ",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_11",
    "number": 11,
    "question": "Em vô tình làm rơi chiếc bút mực mới mua của mình ở sân trường dẫn đến ngòi bút bị tắc mực không viết được. Em nên suy nghĩ thế nào?",
    "options": {
      "A": "Đổ lỗi cho cái sân trường quá cứng làm hỏng bút của mình.",
      "B": "Nhận thức được lỗi là do mình bất cẩn không đậy nắp bút kỹ, xin lỗi bố mẹ vì đã làm hỏng đồ dùng và tự hứa lần sau sẽ cẩn thận giữ gìn hơn.",
      "C": "Bắt bố mẹ phải mua ngay chiếc bút mới đắt tiền hơn cho mình.",
      "D": "Vứt bút đi và đổ lỗi cho bạn đẩy mình ngã làm hỏng."
    },
    "answer": "B",
    "explanation": "Người chịu trách nhiệm không tìm cách đổ lỗi cho hoàn cảnh bên ngoài khi mình làm hỏng đồ cá nhân, biết tự rút kinh nghiệm để cẩn thận hơn.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_12",
    "number": 12,
    "question": "Khi em trêu đùa quá trớn ở sân trường làm một bạn cùng lớp bị ngã đau và chảy nước mắt. Cách xử lý có trách nhiệm và sự chính trực là gì?",
    "options": {
      "A": "Nói với bạn: \"Yếu đuối thế có đùa tí thôi mà cũng khóc!\".",
      "B": "Đỡ bạn dậy, nhìn thẳng vào mắt bạn nói lời xin lỗi chân thành: \"Tớ xin lỗi cậu nhé, tớ đùa nghịch vô ý quá làm cậu đau. Cậu có đi được không, tớ đưa cậu xuống phòng y tế nhé\".",
      "C": "Chạy trốn đi chỗ khác chơi để tránh bị cô giáo phát hiện phạt.",
      "D": "Đi nói xấu bạn với các bạn khác là bạn đang giả vờ khóc ăn vạ."
    },
    "answer": "B",
    "explanation": "Xin lỗi thực chất (authentic apology) đòi hỏi việc nhìn nhận hành vi sai trái của mình, bày tỏ sự thấu cảm nỗi đau của đối phương và chủ động hỗ trợ khắc phục.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_13",
    "number": 13,
    "question": "Bảo quản đồ dùng cá nhân (như sách giáo khoa, hộp bút, cặp sách) sạch đẹp giúp ích gì cho học sinh?",
    "options": {
      "A": "Thể hiện tính ngăn nắp, khoa học, giúp đồ dùng bền đẹp lâu dài, tiết kiệm chi phí cho gia đình và tạo thói quen cẩn thận trong công việc sau này.",
      "B": "Giúp học sinh học giỏi hơn một cách tự động.",
      "C": "Để khoe khoang sự giàu có của gia đình mình với bạn bè.",
      "D": "Để bố mẹ cho phép chơi game nhiều hơn."
    },
    "answer": "A",
    "explanation": "Bảo quản tài sản cá nhân là bài học nền tảng về ý thức công dân, xây dựng tính cẩn thận và thói quen tiết kiệm cần thiết cho tương lai.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_14",
    "number": 14,
    "question": "Khi em làm hỏng chiếc thước kẻ mượn của bạn bên cạnh, hành động thể hiện sự chính trực là gì?",
    "options": {
      "A": "Trả lại thước kẻ gãy cho bạn mà không nói lời nào.",
      "B": "Nói dối là thước kẻ tự gãy chứ mình không làm gì.",
      "C": "Xin lỗi bạn chân thành, giải thích sự cố và mua chiếc thước mới đền lại cho bạn đúng hẹn.",
      "D": "Ném thước kẻ đó đi và mua chiếc thước kẻ cũ hỏng khác đền lại bạn."
    },
    "answer": "C",
    "explanation": "Sự chính trực (integrity) thể hiện rõ nhất khi mình mắc lỗi và đối xử tử tế, công bằng để đền bù thiệt hại cho người khác một cách văn minh.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_15",
    "number": 15,
    "question": "Bạn A khuyên em nói dối cô giáo là quên mang vở bài tập ở nhà (thực chất là em chưa làm bài) để không bị điểm kém. Em nên làm gì?",
    "options": {
      "A": "Làm theo lời khuyên của bạn để trốn tránh hình phạt trước mắt.",
      "B": "Từ chối lời khuyên, trung thực nhận lỗi với cô giáo là mình chưa hoàn thành bài tập, chấp nhận hình phạt và cố gắng làm bù bài tập ngay.",
      "C": "Đổ lỗi cho bạn A rủ rê nên mình mới không làm bài tập.",
      "D": "Giả vờ bị đau ốm để xin nghỉ học trốn tiết kiểm tra bài cũ."
    },
    "answer": "B",
    "explanation": "Sự trung thực (honesty) đòi hỏi lòng dũng cảm đối mặt với sự thật và chịu trách nhiệm trước kết quả hành động chưa tốt của mình thay vì lừa dối.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_16",
    "number": 16,
    "question": "Câu nói nào dưới đây thể hiện lời xin lỗi chân thành và có trách nhiệm nhất?",
    "options": {
      "A": "\"Tớ xin lỗi cậu nhé, cơ mà tại cậu đứng chắn đường tớ mới va vào chứ\".",
      "B": "\"Cho tớ xin lỗi vì đã lỡ lời nói những câu làm cậu buồn lòng. Lần sau tớ sẽ chú ý lời nói của mình hơn để không làm tổn thương cậu nữa\".",
      "C": "\"Xin lỗi được chưa? Mệt quá nói mãi!\".",
      "D": "\"Tớ xin lỗi nhưng chuyện đó chả có gì to tát cả\"."
    },
    "answer": "B",
    "explanation": "Lời xin lỗi đúng chuẩn gồm: Nhận trách nhiệm -> Nêu rõ hành vi sai -> Bày tỏ sự hối lỗi -> Cam kết thay đổi hành vi và không đi kèm lời bào chữa đổ lỗi ngược.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_17",
    "number": 17,
    "question": "Sau khi chơi trò chơi ghép hình lego tại nhà xong, em nên cất dọn đồ chơi thế nào?",
    "options": {
      "A": "Để lego bày bừa bộn trên sàn nhà để ngày mai chơi tiếp.",
      "B": "Tự giác nhặt đầy đủ tất cả các mảnh ghép lego cất vào trong thùng đựng chuyên dụng, đậy nắp lại và cất thùng lên kệ gọn gàng.",
      "C": "Gọi bố mẹ hoặc chị gái dọn dẹp hộ đống lego bừa bãi đó.",
      "D": "Quét tất cả lego vào sọt rác cho nhanh gọn phòng khách."
    },
    "answer": "B",
    "explanation": "Tự giác thu dọn đồ chơi sau khi sử dụng là một phần quan trọng của kỹ năng tự phục vụ bản thân và giữ gìn không gian sinh hoạt chung của gia đình sạch sẽ.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_18",
    "number": 18,
    "question": "Khi đi học về, em treo cặp sách lên móc treo và cất giày lên giá. Hành động này thể hiện điều gì?",
    "options": {
      "A": "Thể hiện sự sợ hãi bị bố mẹ trách mắng.",
      "B": "Thể hiện tính ngăn nắp, tự lập và chịu trách nhiệm về không gian cá nhân của mình.",
      "C": "Thể hiện việc em muốn được bố mẹ thưởng tiền tiêu vặt.",
      "D": "Không thể hiện điều gì cụ thể."
    },
    "answer": "B",
    "explanation": "Thói quen ngăn nắp khi đi học về giúp quản lý đồ dùng gọn gàng, tránh thất lạc và rèn luyện tính tự lập kỷ luật cho học sinh.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_19",
    "number": 19,
    "question": "Một người có trách nhiệm với lời nói của mình sẽ ứng xử thế nào trước lời hứa giúp bạn ôn tập môn Tiếng Anh vào tối nay?",
    "options": {
      "A": "Quên mất lời hứa và đi chơi game thoải mái.",
      "B": "Gặp sự cố đột xuất thì báo sớm cho bạn biết để hẹn dịp khác; nếu không có gì thay đổi sẽ thực hiện lời hứa đúng giờ bằng sự tận tâm.",
      "C": "Hứa cho vui miệng rồi lờ đi không thực hiện.",
      "D": "Bắt bạn phải trả tiền học phí thì mới ôn tập cho bạn."
    },
    "answer": "B",
    "explanation": "Giữ lời hứa (reliability) là tiêu chuẩn vàng để xây dựng lòng tin và sự uy tín của bản thân trong các mối quan hệ bạn bè và xã hội.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_20",
    "number": 20,
    "question": "Khi làm bài tập nhóm vẽ sơ đồ tư duy bị rách góc giấy do em vô ý kéo mạnh, em nên xử lý thế nào?",
    "options": {
      "A": "Lặng lẽ dán băng keo lại và giả vờ như không biết ai làm rách.",
      "B": "Chủ động nói với cả nhóm: \"Tớ xin lỗi nhé, tớ vô ý kéo mạnh làm rách giấy rồi. Để tớ lấy băng dính trong suốt dán lại cẩn thận cho đẹp nhé\".",
      "C": "Đổ lỗi cho bạn đẩy tay mình nên mới rách giấy.",
      "D": "Xé nát cả bức tranh đi để cả nhóm cùng phải làm lại."
    },
    "answer": "B",
    "explanation": "Thừa nhận sai sót nhỏ một cách thẳng thắn trước tập thể và chủ động sửa chữa giúp giữ gìn bầu không khí hòa thuận và tiến độ công việc nhóm.",
    "topic": "CHỦ ĐỀ 2: TỰ CHỊU TRÁCH NHIỆM VỀ HÀNH VI & ĐỒ DÙNG CÁ NÂN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_21",
    "number": 21,
    "question": "Nhóm của em tham gia cuộc thi làm báo tường. Em được phân công nhiệm vụ viết bài cảm nghĩ (mất khoảng 1 tiếng). Em nên thực hiện thế nào?",
    "options": {
      "A": "Trì hoãn công việc đến sát hạn chót nộp bài rồi chép mạng qua loa nộp nhóm.",
      "B": "Hoàn thành phần viết bài đúng thời hạn đã cam kết với nhóm, tự kiểm tra lỗi chính tả kỹ lưỡng trước khi bàn giao cho nhóm trưởng.",
      "C": "Để các thành viên khác trong nhóm viết hộ phần việc của mình.",
      "D": "Tự ý thay đổi nhiệm vụ viết bài sang vẽ tranh mà không thông báo cho nhóm."
    },
    "answer": "B",
    "explanation": "Chịu trách nhiệm về công việc được giao (task accountability) thể hiện sự uy tín cá nhân, tôn trọng tập thể và đóng góp thực chất vào kết quả chung.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_22",
    "number": 22,
    "question": "Khi là \"Trưởng nhóm\" của một dự án học tập, nếu nhóm bị cô giáo phê bình vì bài làm nộp muộn, hành động nào thể hiện vai trò lãnh đạo có trách nhiệm?",
    "options": {
      "A": "Đứng ra đổ lỗi cho bạn A và bạn B trong nhóm làm bài quá chậm trễ.",
      "B": "Nhận trách nhiệm về mình vì đã chưa đôn đốc tốt tiến độ nhóm, xin lỗi cô giáo, cùng cả nhóm phân tích nguyên nhân chậm trễ và nỗ lực hoàn thành bài nộp bù ngay.",
      "C": "Khóc lóc xin cô giáo chấm điểm riêng cho mình cao hơn các bạn.",
      "D": "Tuyên bố giải tán nhóm và không tham gia cuộc thi nữa."
    },
    "answer": "B",
    "explanation": "Nhà lãnh đạo thực thụ (responsible leader) chịu trách nhiệm về kết quả chung của cả đội nhóm thay vì đùn đẩy trách nhiệm cho cấp dưới khi gặp thất bại.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_23",
    "number": 23,
    "question": "Em được nhóm giao nhiệm vụ làm slide trình chiếu thuyết trình nhóm. Em thấy công việc này quá khó vì chưa sử dụng máy tính giỏi. Cách giải quyết có trách nhiệm là:",
    "options": {
      "A": "Im lặng giữ kín khó khăn và đến ngày nộp bài thông báo chưa làm được.",
      "B": "Chủ động báo sớm với nhóm trưởng về khó khăn của mình, nhờ các bạn trong nhóm hướng dẫn phần khó hoặc đề xuất đổi nhiệm vụ phù hợp với năng lực hiện tại của mình.",
      "C": "Tự ý bỏ nhóm đi làm bài tập cá nhân riêng.",
      "D": "Khóc lóc bắt bố mẹ làm hộ slide thuyết trình cho mình."
    },
    "answer": "B",
    "explanation": "Biết nhận diện giới hạn năng lực bản thân, báo cáo khó khăn sớm và tìm kiếm sự hỗ trợ là hành vi trách nhiệm cao đối với tiến độ chung của tập thể.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_24",
    "number": 24,
    "question": "Một bạn trong nhóm tự ý thiết kế bìa tập san nhóm bằng hình ảnh bạo lực mà không bàn bạc trước với các thành viên. Em nên làm gì?",
    "options": {
      "A": "Khen ngợi bạn làm đẹp để tránh cãi vã mất thời gian.",
      "B": "Nhắc nhở nhẹ nhàng nguyên tắc làm việc nhóm: \"Mọi thiết kế chung cần thảo luận thống nhất trước\", phân tích tại sao hình ảnh bạo lực không phù hợp dự án học đường và đề xuất thiết kế lại.",
      "C": "Bỏ bài làm nhóm tự ý vẽ một trang bìa khác nộp cô giáo một mình.",
      "D": "Mắng mỏ và tẩy chay bạn ra khỏi nhóm."
    },
    "answer": "B",
    "explanation": "Chịu trách nhiệm bảo vệ tiêu chuẩn chất lượng dự án học tập của nhóm thông qua các góp ý thẳng thắn, xây dựng và tôn trọng lẫn nhau.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_25",
    "number": 25,
    "question": "Khi cô giáo giao bài tập tự đọc sách khoa học tại nhà cuối tuần, hành vi tự học có trách nhiệm là gì?",
    "options": {
      "A": "Không đọc sách, chỉ đợi đến thứ Hai lên lớp chép bài tóm tắt của bạn.",
      "B": "Tự giác dành 30 phút mỗi ngày cuối tuần để đọc sách nghiêm túc, tự ghi chép tóm tắt các ý chính vào sổ tay cá nhân.",
      "C": "Nói dối bố mẹ là đã đọc xong rồi để được chơi game.",
      "D": "Nhờ anh chị đọc hộ và tóm tắt lại cho mình chép."
    },
    "answer": "B",
    "explanation": "Tự giác học tập là nền tảng cốt lõi của tính chịu trách nhiệm về tương lai học vấn của chính mình, phát triển tinh thần tự học trọn đời.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_26",
    "number": 26,
    "question": "Tại sao việc hoàn thành đúng hạn (deadline) công việc nhóm lại cực kỳ quan trọng?",
    "options": {
      "A": "Để nhóm trưởng không bị cô giáo khiển trách.",
      "B": "Vì công việc của các thành viên liên kết chặt chẽ với nhau; sự chậm trễ của một người sẽ làm tắc nghẽn toàn bộ quy trình và ảnh hưởng đến kết quả của cả nhóm.",
      "C": "Để được về sớm đi chơi bóng đá.",
      "D": "Không có gì quan trọng, nộp muộn một chút cũng không sao."
    },
    "answer": "B",
    "explanation": "Hiểu được tính hệ thống và sự phụ thuộc lẫn nhau trong làm việc nhóm giúp học sinh ý thức sâu sắc hơn về trách nhiệm của mắt xích cá nhân đối với thành bại của tập thể.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_27",
    "number": 27,
    "question": "Khi tham gia thảo luận nhóm làm dự án, em thấy bạn nhóm trưởng phân công việc nặng cho bạn khác còn mình được giao việc rất nhẹ nhàng. Hành động chính trực là:",
    "options": {
      "A": "Im lặng tận hưởng sự ưu tiên thiên vị đó.",
      "B": "Đề xuất nhóm trưởng phân chia công việc đều và cân bằng hơn: \"Tớ thấy bạn A đang nhận việc hơi nhiều, tớ có thể nhận phụ thêm phần sưu tầm ảnh của bạn ấy nhé\".",
      "C": "Chê bai bạn A làm việc quá chậm chạp.",
      "D": "Rủ bạn A cùng bỏ trốn không làm bài tập nữa."
    },
    "answer": "B",
    "explanation": "Sự chính trực và tinh thần công bằng (fairness) giúp xây dựng một môi trường làm việc nhóm đoàn kết, tin tưởng và gắn bó lâu dài.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_28",
    "number": 28,
    "question": "Đâu là dấu hiệu của một học sinh tự chịu trách nhiệm về kết quả kiểm tra định kỳ của mình?",
    "options": {
      "A": "Khi bị điểm kém thì nhận lỗi do mình chưa học bài kỹ và lên kế hoạch học ôn tập sửa sai nghiêm túc.",
      "B": "Khi được điểm cao thì tự hào khoe công của mình, khi điểm kém đổ lỗi cho cô giáo ra đề khó.",
      "C": "Nhờ bạn giỏi nhất lớp ngồi cạnh cho chép bài trong giờ thi.",
      "D": "Tự sửa lại điểm số trong phiếu điểm trước khi đưa bố mẹ ký tên."
    },
    "answer": "A",
    "explanation": "Nhận thức được kết quả học tập là phản ánh trực tiếp từ sự nỗ lực rèn luyện của bản thân là bước đầu tiên để xây dựng động lực học tập thực chất.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_29",
    "number": 29,
    "question": "Trong buổi họp nhóm thuyết trình, em nhận thấy một thành viên đang nhầm lẫn kiến thức lịch sử trầm trọng. Cách góp ý có trách nhiệm là gì?",
    "options": {
      "A": "Cười cợt bạn trước cả nhóm: \"Kiến thức cơ bản thế cũng nhầm, học dốt thế!\".",
      "B": "Gặp riêng bạn sau buổi họp hoặc nhẹ nhàng mở sách giáo khoa ra cùng đối chiếu: \"Tớ thấy chỗ sự kiện này sách ghi thế này nè, cậu kiểm tra lại xem có nhầm lẫn dòng thời gian không nhé\".",
      "C": "Bờ mặc bạn thuyết trình sai trước lớp để bạn bị điểm kém.",
      "D": "Đổi người thuyết trình ngay lập tức không cần thông báo cho bạn."
    },
    "answer": "B",
    "explanation": "Giúp đỡ đồng đội nhận ra và sửa lỗi sai bằng thái độ tế nhị, xây dựng bảo vệ lòng tự trọng của bạn đồng thời đảm bảo chất lượng bài làm nhóm tốt nhất.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_30",
    "number": 30,
    "question": "Khi em hứa mang bút dạ màu đỏ cho nhóm làm báo tường nhưng hôm sau quên mang đi học. Hành vi chịu trách nhiệm là gì?",
    "options": {
      "A": "Nói dối là do mẹ dọn dẹp nhà làm mất bút mực màu đỏ của mình.",
      "B": "Nhận lỗi thật với nhóm, xin lỗi các bạn và chủ động chạy sang lớp khác mượn bút dạ đỏ của bạn bè cho nhóm dùng tạm, hoặc tự đi mua đền chiếc khác giờ ra chơi.",
      "C": "Mắng các bạn trong nhóm vì đã không tự chuẩn bị bút màu đỏ.",
      "D": "Bỏ họp nhóm đi chơi cầu lông một mình để trốn tránh trách nhiệm."
    },
    "answer": "B",
    "explanation": "Nhìn thẳng vào lỗi sai do sơ suất của mình và chủ động tìm giải pháp khắc phục ngay lập tức thể hiện tinh thần trách nhiệm cao đối với tập thể.",
    "topic": "CHỦ ĐỀ 3: CHỊU TRÁCH NHIỆM TRONG HỌC TẬP & LÀM VIỆC NHÓM",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_31",
    "number": 31,
    "question": "Hành vi nào dưới đây được định nghĩa chính xác là hành vi \"Bắt nạt học đường\"?",
    "options": {
      "A": "Bạn vô ý va phải em ở hành lang trường học và đã xin lỗi chân thành.",
      "B": "Một bạn hoặc một nhóm bạn liên tục cố ý dùng lời nói xúc phạm, cô lập, đe dọa, tẩy chay hoặc sử dụng bạo lực vật lý đối với một học sinh khác trong một thời gian dài.",
      "C": "Cô giáo chủ nhiệm phê bình và yêu cầu em viết bản kiểm điểm kiểm điểm vì tội nói chuyện riêng.",
      "D": "Bạn tranh luận quyết liệt với em về một bài toán khó trong giờ học nhóm."
    },
    "answer": "B",
    "explanation": "Bắt nạt học đường (bullying) có đặc trưng là hành vi cố ý, mang tính lặp đi lặp lại và có sự chênh lệch quyền lực nhằm gây tổn hại cho nạn nhân.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_32",
    "number": 32,
    "question": "Đâu là một hành vi bắt nạt bằng lời nói (verbal bullying) gây tổn thương sâu sắc cho bạn bè?",
    "options": {
      "A": "Khen ngợi kiểu tóc mới của bạn trông rất gọn gàng.",
      "B": "Đặt biệt danh xấu xí chê bai ngoại hình, giọng nói ngọng hay hoàn cảnh gia đình của bạn một cách xúc phạm trước đám đông bạn bè.",
      "C": "Rủ bạn cùng thảo luận bài tập nhóm môn Tiếng Việt.",
      "D": "Hỏi bạn mượn tẩy bút chì một cách lịch sự."
    },
    "answer": "B",
    "explanation": "Đặt biệt danh ác ý chê bai ngoại hình là hình thức bắt nạt lời nói phổ biến gây tổn thương tâm lý tự ti nghiêm trọng cho học sinh tiểu học.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_33",
    "number": 33,
    "question": "Nếu em đang bị một nhóm bạn liên tục tẩy chay, không cho chơi cùng và đe dọa đánh sau giờ tan học ở cổng trường. Hành động an toàn là gì?",
    "options": {
      "A": "Giữ kín bí mật tự mình chịu đựng vì sợ bị nhóm bạn đó trả thù nặng hơn.",
      "B": "Mang theo hung khí đến trường để sẵn sàng đánh nhau trả thù nhóm bạn đó.",
      "C": "Báo cáo ngay lập tức với bố mẹ, thầy cô giáo chủ nhiệm hoặc bác bảo vệ trường để nhận được sự bảo vệ và can thiệp kịp thời từ người lớn.",
      "D": "Trốn học ở nhà nằm ngủ suốt tuần."
    },
    "answer": "C",
    "explanation": "Im lặng chịu đựng bắt nạt làm kẻ bắt nạt lấn tới. Báo cáo người lớn đáng tin cậy là cách duy nhất và an toàn nhất để phá vỡ vòng tròn bắt nạt học đường.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_34",
    "number": 34,
    "question": "Khi em chứng kiến cảnh một bạn học sinh nhút nhát trong lớp đang bị nhóm bạn khác vây quanh giật mũ, ném balo và chế giễu bôi bẩn quần áo. Em nên làm gì?",
    "options": {
      "A": "Đứng ngoài xem, cười cổ vũ và quay video đăng lên mạng xã hội.",
      "B": "Tránh đi chỗ khác coi như không nhìn thấy gì vì sợ liên lụy đến mình.",
      "C": "Lên tiếng phản đối hành vi bắt nạt đó: \"Các bạn dừng lại đi!\", đồng thời nhanh chóng chạy đi gọi thầy cô giáo hoặc bác bảo vệ đến can thiệp cứu bạn.",
      "D": "Nhảy vào giật balo ném phụ cùng các bạn kia cho vui lớp."
    },
    "answer": "C",
    "explanation": "Đóng vai trò người bảo vệ chủ động (upstander) bằng cách lên tiếng phản đối và tìm người lớn can thiệp là hành động dũng cảm, nhân văn giúp ngăn ngừa nạn bắt nạt.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_35",
    "number": 35,
    "question": "Tại sao việc trêu chọc và chế giễu bạn bè có hoàn cảnh khó khăn lại là hành vi trái đạo đức và đáng bị lên án?",
    "options": {
      "A": "Vì trêu bạn nghèo sẽ làm lớp học bị mất điểm thi đua cuối tuần.",
      "B": "Vì làm tổn thương lòng tự trọng, gây mặc cảm tự ti sâu sắc cho bạn và phá hoại giá trị nhân văn về tình yêu thương, sự bình đẳng giữa con người với con người.",
      "C": "Vì bạn nghèo có thể sẽ đánh lại em.",
      "D": "Vì trêu bạn nghèo sẽ làm bố mẹ em bị phạt tiền."
    },
    "answer": "B",
    "explanation": "Mọi học sinh đều có quyền được đối xử tôn trọng, bình đẳng bất kể hoàn cảnh xuất thân. Chê bai hoàn cảnh là hành vi xúc phạm nhân phẩm nghiêm trọng.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_36",
    "number": 36,
    "question": "Khi em bị một bạn cố tình xô ngã đau đớn ở sân trường và bạn bắt đầu thách thức đe dọa. Hành động tự vệ thông minh là gì?",
    "options": {
      "A": "Lập tức nhảy vào đánh nhau túi bụi với bạn để chứng tỏ mình khỏe.",
      "B": "Giữ khoảng cách an toàn, nói to rõ ràng dứt khoát: \"Tớ không thích đánh nhau! Dừng lại ngay!\" rồi nhanh chóng di chuyển đến nơi có giáo viên bảo vệ.",
      "C": "Nằm im dưới đất khóc lóc ăn vạ bắt bạn phải đền tiền.",
      "D": "Mắng chửi bậy bạ lại bạn để xả cơn giận của mình."
    },
    "answer": "B",
    "explanation": "Tự vệ thông minh ưu tiên việc kiểm soát hành vi bạo lực vật lý, khẳng định lập trường phi bạo lực bằng giọng dứt khoát và thoát thân đến vùng an toàn.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_37",
    "number": 37,
    "question": "Một bạn trong lớp có làn da đen và bị các bạn trêu là \"đồ bao công cột nhà cháy\". Thái độ tôn trọng đặc điểm riêng của em thể hiện như thế nào?",
    "options": {
      "A": "Cùng cười lớn chế giễu làn da của bạn.",
      "B": "Hiểu rằng màu da là đặc điểm sinh học tự nhiên quý giá của mỗi người, thân thiện nói chuyện bình thường với bạn và khuyên các bạn khác dừng trêu chọc ác ý.",
      "C": "Tránh xa không ngồi học cạnh bạn vì sợ lây màu da đen.",
      "D": "Khuyên bạn nên đi tắm trắng để không bị trêu nữa."
    },
    "answer": "B",
    "explanation": "Tôn trọng đặc điểm ngoại hình sinh học của bạn bè là biểu hiện của học sinh có văn hóa giao tiếp văn minh, đa dạng và nhân ái.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_38",
    "number": 38,
    "question": "Nhận định nào sau đây là ĐÚNG về hậu quả của nạn bắt nạt học đường đối với nạn nhân?",
    "options": {
      "A": "Giúp nạn nhân trở nên mạnh mẽ, dũng cảm và học tập tốt hơn.",
      "B": "Gây tổn thương tâm lý nặng nề (lo âu, trầm cảm, sợ hãi đi học), suy giảm sức khỏe thể chất, giảm sút kết quả học tập và có thể dẫn đến hậu quả nguy hiểm tính mạng.",
      "C": "Không gây ảnh hưởng gì lớn, trẻ con đùa nghịch lớn lên sẽ quên hết.",
      "D": "Chỉ làm tốn tiền mua sách vở mới do bị rách nát."
    },
    "answer": "B",
    "explanation": "Bắt nạt để lại những di chứng tâm lý sâu sắc đi suốt cuộc đời nạn nhân. Việc nhận thức rõ tác hại giúp xã hội học đường có thái độ không khoan nhượng với bắt nạt.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_39",
    "number": 39,
    "question": "Em thấy bạn thân của mình đang lôi kéo các bạn khác trong lớp cùng ký tên tẩy chay không chơi với bạn B chỉ vì bạn B học yếu hơn nhóm. Em nên hành động thế nào?",
    "options": {
      "A": "Ký tên ủng hộ bạn thân của mình ngay lập tức để chứng tỏ lòng trung thành bạn bè.",
      "B": "Từ chối ký tên tẩy chay bạn B, phân tích cho bạn thân hiểu hành vi cô lập bạn là bắt nạt tinh thần sai trái và khuyên bạn nên dừng lại giúp đỡ bạn B học tập.",
      "C": "Giả vờ đồng ý ký tên nhưng âm thầm nói chuyện bình thường với bạn B.",
      "D": "Đi mách cô giáo ngay lập tức để cô phạt bạn thân của mình thật nặng."
    },
    "answer": "B",
    "explanation": "Tình bạn chân chính không đồng nghĩa với việc đồng tình ủng hộ hành vi sai trái của bạn. Cần dũng cảm lên tiếng sửa sai cho bạn bằng thái độ xây dựng.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_40",
    "number": 40,
    "question": "Để xây dựng một lớp học hạnh phúc và không có bắt nạt học đường, mỗi học sinh cần thực hiện cam kết nào?",
    "options": {
      "A": "Chỉ chơi thân với những bạn giàu có và học giỏi nhất lớp.",
      "B": "Tôn trọng sự khác biệt, sử dụng ngôn từ tích cực khích lệ bạn bè, giúp đỡ bạn gặp khó khăn, không tham gia và kiên quyết lên tiếng chống lại mọi hành vi bắt nạt.",
      "C": "Tránh xa các hoạt động tập thể lớp học để đỡ xảy ra mâu thuẫn cãi vã.",
      "D": "Im lặng trước mọi sự việc bắt nạt xảy ra trong lớp để giữ hòa khí chung."
    },
    "answer": "B",
    "explanation": "Xây dựng môi trường học đường an toàn, nhân ái là trách nhiệm chung của mỗi cá nhân học sinh thông qua các hành vi tử tế, bao dung hàng ngày.",
    "topic": "CHỦ ĐỀ 4: NHẬN DIỆN & PHÒNG TRÁNH BẮT NẠT HỌC ĐƯỜNG",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_41",
    "number": 41,
    "question": "Hành vi nào sau đây được định nghĩa là \"Bắt nạt trực tuyến\" (Cyberbullying)?",
    "options": {
      "A": "Bạn gửi tin nhắn hỏi thăm sức khỏe học tập của em qua Zalo.",
      "B": "Sử dụng các thiết bị công nghệ (điện thoại, máy tính) để liên tục đăng tin đồn sai sự thật, gửi tin nhắn đe dọa, xúc phạm hoặc tung hình ảnh chế giễu xấu xí của người khác lên mạng xã hội.",
      "C": "Cô giáo gửi thông báo điểm số thi học kỳ của lớp vào nhóm chat phụ huynh học sinh.",
      "D": "Em chia sẻ một bài hát thiếu nhi yêu thích lên trang cá nhân Facebook."
    },
    "answer": "B",
    "explanation": "Bắt nạt trực tuyến là hình thức bắt nạt sử dụng không gian mạng và công nghệ số để khủng bố tinh thần, làm nhục hoặc quấy rối nạn nhân một cách có chủ đích.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_42",
    "number": 42,
    "question": "Một bạn trong lớp tự ý chụp ảnh chụp lén cảnh em đang ngáp ngủ ngớ ngẩn rồi chế ảnh (meme) châm chọc đăng lên nhóm chat chung của lớp kèm những lời bình luận chế giễu. Đây là hành vi gì?",
    "options": {
      "A": "Một trò đùa vui vẻ bình thường giúp gắn kết lớp học.",
      "B": "Hành vi bắt nạt trực tuyến xâm phạm hình ảnh cá nhân và làm nhục danh dự bạn bè trên mạng xã hội.",
      "C": "Hành vi sáng tạo nghệ thuật độc đáo đáng được khích lệ.",
      "D": "Do em ngáp ngủ ngớ ngẩn nên lỗi hoàn toàn là ở em."
    },
    "answer": "B",
    "explanation": "Tự ý sử dụng hình ảnh cá nhân của người khác để chế giễu, làm nhạo báng trên không gian mạng là hành vi bắt nạt trực tuyến điển hình cần được ngăn chặn.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_43",
    "number": 43,
    "question": "Khi em nhận được những tin nhắn liên tục xúc phạm, chửi bới từ một tài khoản facebook lạ mặt trong nhóm game online, hành động xử lý thông minh và an toàn là gì?",
    "options": {
      "A": "Nhắn tin chửi bới lại người đó thậm tệ hơn để trả đũa.",
      "B": "Giữ bình tĩnh, KHÔNG phản hồi tin nhắn; chụp ảnh màn hình lưu bằng chứng, chặn tài khoản đó (block), và báo ngay cho bố mẹ hoặc người lớn biết để xử lý.",
      "C": "Sợ hãi khóc lóc và tự xóa tài khoản học tập của mình đi trốn tránh.",
      "D": "Hẹn người lạ đó ra ngoài ngõ vắng để đánh nhau giải quyết mâu thuẫn."
    },
    "answer": "B",
    "explanation": "Nguyên tắc xử lý quấy rối trực tuyến: Không phản hồi (để tránh bẫy khiêu khích) -> Lưu bằng chứng -> Chặn tài khoản -> Báo cáo người lớn để có biện pháp can thiệp pháp lý/kỹ thuật.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_44",
    "number": 44,
    "question": "Tại sao bắt nạt trực tuyến lại có tính nguy hiểm và lan truyền nhanh hơn bắt nạt truyền thống ở sân trường?",
    "options": {
      "A": "Vì trên mạng internet có nhiều người sử dụng máy tính chạy nhanh hơn.",
      "B": "Vì thông tin xấu, hình ảnh bôi nhọ có thể lan truyền đến hàng ngàn người ngay lập tức, tồn tại lâu dài trên mạng internet và kẻ bắt nạt có thể ẩn danh làm nạn nhân khó phòng vệ.",
      "C": "Vì bắt nạt trực tuyến làm tốn nhiều tiền cước mạng internet của gia đình.",
      "D": "Vì bắt nạt trực tuyến không bị công an xử lý pháp luật."
    },
    "answer": "B",
    "explanation": "Tính lan truyền không giới hạn không gian thời gian và khả năng ẩn danh (anonymity) của internet làm gia tăng mức độ tổn thương tâm lý cho nạn nhân bắt nạt trực tuyến.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_45",
    "number": 45,
    "question": "Khi tham gia nhóm chat Zalo học tập của lớp, nguyên tắc ứng xử văn minh nào em cần tuân thủ?",
    "options": {
      "A": "Tự do chia sẻ tin đồn giật gân, nói xấu các bạn khác trong lớp cho xôm nhóm.",
      "B": "Chỉ đăng tải thông tin liên quan học tập; sử dụng ngôn từ lịch sự, tôn trọng bạn bè và giáo viên; không spam tin nhắn rác hoặc nói tục chửi bậy trong nhóm.",
      "C": "Bật micro hét to hoặc gửi hàng loạt hình ảnh sticker bạo lực liên tục.",
      "D": "Chụp ảnh màn hình tin nhắn riêng tư của bạn khác đăng vào nhóm để mọi người cùng bàn tán."
    },
    "answer": "B",
    "explanation": "Văn hóa ứng xử nhóm chat học tập đòi hỏi sự tôn trọng không gian chung, tuân thủ mục đích học tập và bảo mật thông tin cá nhân của các thành viên.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_46",
    "number": 46,
    "question": "Em thấy một tài khoản giả mạo đăng tin đồn sai sự thật rằng bạn thân của em ăn trộm tiền của lớp. Hành vi bảo vệ bạn đúng đắn là gì?",
    "options": {
      "A": "Đọc tin đồn rồi nghi ngờ bạn thân của mình và nghỉ chơi với bạn.",
      "B": "KHÔNG chia sẻ tin đồn đó; chụp ảnh bài viết gửi cho bố mẹ hoặc giáo viên chủ nhiệm biết để can thiệp đính chính và báo cáo vi phạm (report) bài viết giả mạo đó.",
      "C": "Bình luận chửi bới kịch liệt tài khoản giả mạo đó dưới phần bình luận công cộng.",
      "D": "Giả vờ không biết vì sợ bị liên lụy trên mạng xã hội."
    },
    "answer": "B",
    "explanation": "Hỗ trợ nạn nhân bị vu khống mạng bằng cách ngăn chặn lan truyền, báo cáo nguồn tin xấu cho người có thẩm quyền và báo cáo kỹ thuật giúp bảo vệ sự thật và danh dự của bạn.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_47",
    "number": 47,
    "question": "Trước khi quyết định đăng tải một bức ảnh chụp chung với các bạn trong lớp lên mạng xã hội cá nhân, hành vi tôn trọng bảo mật của em là gì?",
    "options": {
      "A": "Đăng tự do thoải mái vì đó là trang cá nhân riêng của mình.",
      "B": "Chủ động hỏi ý kiến và nhận được sự đồng ý của các bạn có mặt trong ảnh trước khi đăng lên mạng xã hội.",
      "C": "Gắn thẻ (tag) tên tất cả các bạn vào ảnh mà không cần hỏi bạn trước.",
      "D": "Chỉnh sửa làm mờ mặt mình đi còn mặt các bạn giữ nguyên xấu xí để đăng lên."
    },
    "answer": "B",
    "explanation": "Tôn trọng quyền riêng tư hình ảnh (image privacy rights) của người khác là thói quen văn minh số cần giáo dục cho học sinh tiểu học khi sử dụng internet.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_48",
    "number": 48,
    "question": "Kẻ xấu trên mạng internet có thể sử dụng thông tin cá nhân nào của em đăng tải công khai để thực hiện hành vi lừa đảo hoặc bắt nạt?",
    "options": {
      "A": "Tên trường học, địa chỉ nhà riêng, số điện thoại của bố mẹ, hình ảnh đồng phục học sinh hoặc vị trí check-in hàng ngày của em.",
      "B": "Điểm số bài thi học kỳ môn Mỹ thuật của em.",
      "C": "Danh sách các bài hát thiếu nhi em yêu thích nhất.",
      "D": "Màu sắc chiếc cặp sách em đeo đi học."
    },
    "answer": "A",
    "explanation": "Các thông tin định danh cá nhân (PII) rất nhạy cảm. Kẻ xấu có thể lợi dụng để dàn cảnh bắt cóc, lừa đảo gia đình hoặc quấy rối. Tuyệt đối không chia sẻ công khai lên mạng.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_49",
    "number": 49,
    "question": "Nếu em nhận thấy một bạn trong lớp có biểu hiện u buồn, sợ hãi sờ vào điện thoại và muốn nghỉ học sau khi bị nhóm bạn lớp khác bêu rếu trên Facebook. Em nên khuyên bạn thế nào?",
    "options": {
      "A": "\"Mạng xã hội ảo thôi mà, kệ đi học tiếp đi có gì đâu mà sợ\".",
      "B": "\"Cậu hãy khóa máy điện thoại lại tạm thời, chia sẻ ngay câu chuyện này với bố mẹ hoặc cô giáo chủ nhiệm để người lớn giúp đỡ giải quyết nhé. Tớ luôn ở bên cậu\".",
      "C": "\"Cậu nên nghỉ học ở nhà một thời gian cho mọi người quên đi\".",
      "D": "\"Cậu nên tạo nick ảo nói xấu lại các bạn kia để trả đũa\"."
    },
    "answer": "B",
    "explanation": "Lời khuyên định hướng an toàn, khích lệ chia sẻ với người lớn và cam kết đồng hành giúp nạn nhân bắt nạt trực tuyến tránh nguy cơ trầm cảm, ổn định tâm lý.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Trách_nhiệm_&_Sự_chính_trực_50",
    "number": 50,
    "question": "Đâu là thông điệp đúng đắn nhất về việc sử dụng mạng xã hội văn minh ở lứa tuổi học sinh tiểu học?",
    "options": {
      "A": "Mạng xã hội là nơi ẩn danh nên chúng ta có thể tự do phát ngôn chửi bới mà không cần chịu trách nhiệm.",
      "B": "Hãy luôn đối xử tử tế, lịch thiệp và tôn trọng người khác trên không gian mạng giống như cách em cư xử văn minh trực tiếp ngoài đời thực.",
      "C": "Chỉ sử dụng mạng xã hội để chơi game giải trí suốt cả ngày đêm.",
      "D": "Không bao giờ chạm vào máy tính hay internet để tránh bị bắt nạt."
    },
    "answer": "B",
    "explanation": "Dấu chân số (digital footprint) tồn tại lâu dài. Việc xây dựng ý thức trách nhiệm hành vi trên mạng xã hội tương đương ngoài đời thực là cốt lõi của giáo dục Công dân số (Digital Citizenship).",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN & PHÒNG CHỐNG BẮT NẠT TRỰC TUYẾN",
    "group": "Trách nhiệm & Sự chính trực"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_1",
    "number": 1,
    "question": "Em đi nhà sách cùng mẹ và thấy một bộ bút chì màu sáp lấp lánh rất đẹp dù hộp bút màu ở nhà của em vẫn còn đầy đủ và dùng tốt. Bộ sáp màu mới này thuộc nhóm nào dưới đây?",
    "options": {
      "A": "Nhu cầu thiết yếu (đồ dùng bắt buộc phải có cho việc học tập ngay lập tức).",
      "B": "Mong muốn sở thích (những món đồ em thích có nhưng chưa thực sự cần thiết lúc này).",
      "C": "Đồ dùng bỏ đi không có giá trị gì.",
      "D": "Nhu cầu sinh hoạt bắt buộc hàng ngày."
    },
    "answer": "B",
    "explanation": "Phân biệt \"Nhu cầu\" (Needs - thứ bắt buộc phải có để sống và học tập như sách giáo khoa, cơm ăn, nước uống) và \"Mong muốn\" (Wants - thứ có thêm thì vui nhưng không có vẫn sống, học tập bình thường) giúp học sinh quản lý chi tiêu khôn ngoan.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_2",
    "number": 2,
    "question": "Đồ dùng nào sau đây là \"Nhu cầu thiết yếu\" phục vụ trực tiếp cho việc học tập của học sinh tiểu học?",
    "options": {
      "A": "Một bộ máy chơi game Playstation 5.",
      "B": "Sách giáo khoa, vở ghi chép bài, bút mực và thước kẻ.",
      "C": "Một chiếc điện thoại thông minh iPhone đời mới nhất.",
      "D": "Bộ sưu tập thẻ bài siêu nhân đắt tiền."
    },
    "answer": "B",
    "explanation": "Các đồ dùng phục vụ trực tiếp cho quá trình viết, đọc và tiếp thu kiến thức cốt lõi tại nhà trường được coi là nhu cầu thiết yếu đối với học sinh.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_3",
    "number": 3,
    "question": "Mỗi tháng bố mẹ cho em 50.000 đồng tiền tiêu vặt. Cách lập kế hoạch chi tiêu hợp lý nhất là gì?",
    "options": {
      "A": "Tiêu hết sạch 50.000 đồng ngay ngày đầu tiên để mua kẹo ngọt và đồ chơi.",
      "B": "Chia số tiền làm 3 phần: một phần nhỏ mua đồ dùng học tập cần thiết (20.000đ), một phần dành cho mong muốn nhỏ (10.000đ) và phần còn lại bỏ vào heo đất tiết kiệm (20.000đ).",
      "C": "Mang số tiền đi cho các bạn lớn tuổi hơn mượn chơi game.",
      "D": "Vứt tiền vào góc cặp sách và không quan tâm đến nó nữa."
    },
    "answer": "B",
    "explanation": "Phương pháp chia ngân sách thành các hũ tài chính (như Tiêu dùng thiết yếu, Mong muốn cá nhân, Tiết kiệm) giúp hình thành thói quen quản lý tài chính thông minh từ nhỏ.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_4",
    "number": 4,
    "question": "Khi muốn mua một món đồ chơi đắt tiền thuộc nhóm \"Mong muốn\", hành động của một học sinh tự lập tài chính là gì?",
    "options": {
      "A": "Khóc lóc đòi bố mẹ phải mua cho bằng được ngay lập tức.",
      "B": "Lên kế hoạch tiết kiệm tiền tiêu vặt hàng tuần, bỏ heo đất đều đặn và kiên nhẫn tích lũy cho đến khi đủ số tiền tự mua.",
      "C": "Tự ý lấy tiền ví của bố mẹ đi mua đồ chơi đó một mình.",
      "D": "Đi mượn tiền của các bạn cùng lớp để mua trước rồi tính sau."
    },
    "answer": "B",
    "explanation": "Tích lũy để mua món đồ yêu thích giúp rèn luyện tính kiên nhẫn, trân trọng giá trị đồng tiền và tránh tạo áp lực nợ nần cho bản thân.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_5",
    "number": 5,
    "question": "Thế nào là một bản \"Kế hoạch chi tiêu hợp lý\"?",
    "options": {
      "A": "Bản kế hoạch cho thấy số tiền chi tiêu vượt quá số tiền em hiện có.",
      "B": "Bản kế hoạch phân bổ nguồn tiền rõ ràng, ưu tiên cho các nhu cầu thiết yếu trước, kiểm soát mong muốn cá nhân và luôn giữ lại một phần để tiết kiệm.",
      "C": "Bản kế hoạch chỉ toàn ghi chú mua đồ chơi công nghệ đắt tiền.",
      "D": "Bản kế hoạch do em tự vẽ ra nhưng không bao giờ thực hiện theo."
    },
    "answer": "B",
    "explanation": "Kế hoạch chi tiêu khoa học phải cân đối thu chi (thu luôn lớn hơn hoặc bằng chi) và đặt mục tiêu ưu tiên đúng đắn cho các khoản chi dùng thực tế.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_6",
    "number": 6,
    "question": "Nhu cầu sinh hoạt thiết yếu của gia đình bao gồm những khoản chi nào dưới đây?",
    "options": {
      "A": "Tiền mua vé xem phim hoạt hình rạp chiếu phim hàng tuần.",
      "B": "Tiền mua thực phẩm (gạo, rau, thịt), tiền điện, tiền nước sạch và tiền đóng học phí cho con cái.",
      "C": "Tiền mua sắm trang sức đắt tiền cho mẹ.",
      "D": "Tiền mua máy chơi game cầm tay cho bố."
    },
    "answer": "B",
    "explanation": "Các khoản chi duy trì sự sinh tồn, sức khỏe và giáo dục nền tảng của các thành viên trong gia đình được định nghĩa là nhu cầu sinh hoạt cốt lõi.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_7",
    "number": 7,
    "question": "Bố mẹ rủ em cùng lập danh sách đồ đi siêu thị cuối tuần. Lựa chọn nào thể hiện sự hiểu biết về lập kế hoạch chi tiêu?",
    "options": {
      "A": "Lên danh sách tất cả các loại kẹo bánh ngọt có trong siêu thị.",
      "B": "Cùng bố mẹ kiểm tra xem bếp nhà còn thiếu những thực phẩm gì, viết danh sách cụ thể và chỉ mua đúng những thứ ghi trên giấy khi đến siêu thị.",
      "C": "Không cần lập danh sách, cứ đến siêu thị thấy gì đẹp mắt thì lấy bỏ vào giỏ hàng.",
      "D": "Đòi mua xe đạp điện mới dù xe đạp cũ ở nhà vẫn đi rất tốt."
    },
    "answer": "B",
    "explanation": "Mua sắm theo danh sách (shopping list) ngăn ngừa mua sắm ngẫu hứng (impulse buying), giúp tiết kiệm thời gian và kiểm soát ngân sách hiệu quả.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_8",
    "number": 8,
    "question": "Tại sao việc phân biệt nhu cầu và mong muốn lại giúp em tránh được việc lãng phí tiền bạc?",
    "options": {
      "A": "Vì nó giúp em nhận diện những thứ mình thực sự cần để sống và học tập, từ đó hạn chế chi tiêu cho những thứ thích nhất thời nhưng không hữu ích lâu dài.",
      "B": "Vì nó giúp em không bao giờ phải tiêu một đồng xu nào cả.",
      "C": "Vì phân biệt được sẽ được bố mẹ thưởng thêm nhiều tiền hơn.",
      "D": "Không giúp ích gì, chỉ làm em mệt óc khi mua sắm."
    },
    "answer": "A",
    "explanation": "Nhận thức rõ sự khác biệt giữa Needs và Wants giúp học sinh kiểm soát ham muốn tiêu dùng bộc phát, hướng tới lối sống giản dị, tiết kiệm lành mạnh.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_9",
    "number": 9,
    "question": "Em được thưởng 100.000 đồng vì đạt thành tích học sinh xuất sắc. Hành động quản lý tài chính khôn ngoan là:",
    "options": {
      "A": "Rủ các bạn đi ăn liên hoan hết sạch 100.000đ ngay buổi chiều.",
      "B": "Trích 20.000đ mua một cuốn sách yêu thích tự thưởng bản thân, 80.000đ còn lại bỏ heo đất tiết kiệm dài hạn.",
      "C": "Mua một chiếc đồ chơi siêu nhân nhựa rẻ tiền dễ hỏng rồi vứt sọt rác.",
      "D": "Giấu tiền dưới đệm giường ngủ rồi quên mất vị trí."
    },
    "answer": "B",
    "explanation": "Biết tự thưởng lành mạnh ở mức vừa phải và dành phần lớn tiền thưởng để tích lũy thể hiện sự cân bằng tốt trong tư duy tài chính của học sinh.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_10",
    "number": 10,
    "question": "Bạn của em rủ em chung tiền mua một gói thẻ bài siêu nhân đắt tiền nhưng em đang để dành tiền mua kính cận mới. Em nên ứng xử thế nào?",
    "options": {
      "A": "Đồng ý chung tiền mua thẻ bài ngay vì sợ bạn giận dỗi.",
      "B": "Từ chối lịch sự: \"Tớ đang tập trung tiết kiệm tiền để mua kính cận mới rồi, hẹn cậu dịp khác khi tớ hoàn thành mục tiêu nhé\".",
      "C": "Nói dối bạn là mình không có tiền rồi âm thầm đi mua đồ chơi khác một mình.",
      "D": "Mắng bạn vì tội rủ rê tiêu tiền vô bổ."
    },
    "answer": "B",
    "explanation": "Xác định thứ tự ưu tiên mục tiêu tài chính rõ ràng giúp học sinh kiên định trước những lời mời gọi chi tiêu ngẫu hứng từ bạn bè.",
    "topic": "CHỦ ĐỀ 1: PHÂN BIỆT NHU CẦU & MONG MUỐN, LẬP KẾ HOẠCH CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_11",
    "number": 11,
    "question": "Khi đi mua một hộp sữa chua tại cửa hàng tiện lợi, thông tin quan trọng nào trên vỏ hộp em bắt buộc phải kiểm tra trước khi thanh toán?",
    "options": {
      "A": "Màu sắc hình ảnh in trên vỏ hộp sữa chua có đẹp mắt không.",
      "B": "Giá tiền sản phẩm và Hạn sử dụng (Exp Date) xem sản phẩm còn dùng được an toàn không.",
      "C": "Hình ảnh quảng cáo của ca sĩ đại diện trên bao bì.",
      "D": "Tên nhà phân phối vận chuyển sữa chua."
    },
    "answer": "B",
    "explanation": "Kiểm tra giá giúp kiểm soát ngân sách; kiểm tra hạn sử dụng bảo vệ sức khỏe bản thân khỏi nguy cơ ngộ độc thực phẩm do sản phẩm hết hạn.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_12",
    "number": 12,
    "question": "Em thấy một quảng cáo trên tivi nói rằng: \"Uống sữa SuperKid này sẽ giúp bạn thông minh nhất lớp ngay sau 1 tuần\". Lựa chọn tư duy phản biện đúng đắn là gì?",
    "options": {
      "A": "Tin ngay lập tức và khóc lóc bắt bố mẹ mua loại sữa đó về uống liên tục.",
      "B": "Hiểu rằng quảng cáo thường phóng đại thông tin để bán hàng; sự thông minh học giỏi cần quá trình rèn luyện, học tập chăm chỉ kết hợp ăn uống đủ chất chứ không thể có ngay sau 1 tuần uống sữa.",
      "C": "Tẩy chay sữa SuperKid hoàn toàn vì họ nói dối.",
      "D": "Đi nói với tất cả các bạn trong lớp là sữa đó lừa đảo."
    },
    "answer": "B",
    "explanation": "Kỹ năng phân tích quảng cáo (advertising literacy) giúp học sinh nhận diện bản chất của truyền thông bán hàng, tránh bẫy quảng cáo phóng đại để đưa ra quyết định mua sắm thực tế.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_13",
    "number": 13,
    "question": "Em mang 20.000 đồng đi mua bút chì. Cửa hàng có hai loại: Loại A của thương hiệu uy tín giá 5.000đ/chiếc viết tốt bền; Loại B bọc vỏ hoạt hình lấp lánh giá 15.000đ/chiếc. Lựa chọn mua sắm thông minh là:",
    "options": {
      "A": "Mua loại B vì trông nó sành điệu hơn và chụp ảnh khoe bạn bè rất đẹp.",
      "B": "Mua loại A vì nó đáp ứng tốt nhu cầu viết bài, độ bền cao và em vẫn còn thừa 15.000đ bỏ heo đất tiết kiệm.",
      "C": "Mua cả hai loại mặc dù vượt quá số tiền mang theo.",
      "D": "Không mua loại nào, đi về nhà đòi bố mẹ mua cho loại đắt nhất."
    },
    "answer": "B",
    "explanation": "Tiêu dùng thông thái ưu tiên giá trị sử dụng thực chất (utility-to-price ratio) của sản phẩm hơn là những giá trị trang trí bên ngoài không thiết thực.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_14",
    "number": 14,
    "question": "Tại sao các siêu thị thường đặt những hộp kẹo ngọt, đồ chơi sặc sỡ ngay sát quầy thanh toán tiền?",
    "options": {
      "A": "Để trang trí cho quầy thanh toán trông đẹp mắt hơn.",
      "B": "Để kích thích trẻ em tò mò đòi bố mẹ mua sắm ngẫu hứng phút chót khi đang đứng xếp hàng chờ thanh toán.",
      "C": "Để tặng miễn phí cho tất cả trẻ em đi mua sắm.",
      "D": "Vì khu vực đó có nhiệt độ mát nhất siêu thị."
    },
    "answer": "B",
    "explanation": "Đây là một chiến thuật sắp đặt bán hàng (marketing placement). Nhận biết điều này giúp phụ huynh và học sinh chủ động tránh bẫy mua sắm ngẫu hứng ngoài kế hoạch.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_15",
    "number": 15,
    "question": "Khi đi chợ cùng bà, em thấy bà so sánh giá tiền của cùng 1 kg rau cải ở hai sạp hàng khác nhau trước khi quyết định mua. Hành động của bà dạy em bài học gì?",
    "options": {
      "A": "Tiết kiệm tiền bằng cách khảo sát giá (price comparison) để mua được sản phẩm chất lượng tốt với giá cả phải chăng nhất.",
      "B": "Bà là người keo kiệt không muốn tiêu tiền.",
      "C": "Mua sắm rau cải rất tốn thời gian.",
      "D": "Nên tự trồng rau cải ở nhà để không phải đi chợ."
    },
    "answer": "A",
    "explanation": "So sánh giá giữa các nhà cung cấp là kỹ thuật mua sắm cơ bản giúp người tiêu dùng thông thái tiết kiệm chi phí sinh hoạt cho gia đình.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_16",
    "number": 16,
    "question": "Một quảng cáo trò chơi game trên mạng hiển thị dòng chữ: \"Chơi game miễn phí hoàn toàn\". Tuy nhiên khi vào chơi, game liên tục yêu cầu nạp tiền thật để mua trang phục nhân vật thì mới chơi tiếp được. Em nên suy nghĩ thế nào?",
    "options": {
      "A": "Nạp tiền ngay lập tức vì họ quảng cáo là game miễn phí.",
      "B": "Nhận diện đây là bẫy quảng cáo thu hút người chơi (free-to-play nhưng pay-to-win), tắt game đi và thảo luận với bố mẹ về việc chơi game lành mạnh không tốn tiền.",
      "C": "Đập máy tính vì giận dỗi nhà phát hành game.",
      "D": "Đi mượn tiền bạn bè nạp vào game để vượt màn chơi."
    },
    "answer": "B",
    "explanation": "Nhận thức rõ mô hình kinh doanh trong game online giúp học sinh tự bảo vệ tài chính gia đình khỏi những khoản chi dùng ảo, gây tốn kém tiền của bố mẹ.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_17",
    "number": 17,
    "question": "Tiêu chí nào dưới đây KHÔNG phải là đặc điểm của một \"Người tiêu dùng thông thái\"?",
    "options": {
      "A": "Luôn so sánh giá và chất lượng trước khi mua hàng.",
      "B": "Luôn mua sắm dựa theo cảm xúc bộc phát và các quảng cáo giật gân trên mạng xã hội.",
      "C": "Đọc kỹ nhãn mác sản phẩm và kiểm tra hạn sử dụng.",
      "D": "Lên kế hoạch chi tiêu trước khi đi siêu thị."
    },
    "answer": "B",
    "explanation": "Mua sắm theo cảm xúc bộc phát (impulse buying) là đặc điểm của người tiêu dùng thiếu kế hoạch, dễ dẫn đến lãng phí tài chính nghiêm trọng.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_18",
    "number": 18,
    "question": "Khi đi siêu thị mua bánh quy ngọt, em thấy trên nhãn sản phẩm ghi: \"Hạn sử dụng: 30/10/2026\". Hôm nay là ngày 28/10/2026. Em nên chọn hộp bánh này thế nào?",
    "options": {
      "A": "Vẫn mua bình thường vì hạn sử dụng vẫn còn 2 ngày.",
      "B": "Không nên mua vì sản phẩm đã quá cận ngày hết hạn sử dụng, chất lượng bánh có thể suy giảm và dễ hỏng nếu không ăn hết ngay trong ngày. Nên tìm hộp bánh có ngày sản xuất mới hơn.",
      "C": "Mua thật nhiều hộp bánh này về tích trữ trong tủ.",
      "D": "Báo bảo vệ siêu thị bắt giữ người bán bánh vì bán hàng độc hại."
    },
    "answer": "B",
    "explanation": "Mua hàng cận date dễ gặp rủi ro biến chất thực phẩm hoặc không kịp sử dụng hết gây lãng phí. Người tiêu dùng thông minh luôn ưu tiên các sản phẩm có hạn dùng dài an toàn.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_19",
    "number": 19,
    "question": "Bạn rủ em mua đồ chơi slime tự chế không rõ nguồn gốc nhãn mác bán ở vỉa hè cổng trường vì \"nó rất rẻ\". Em nên làm gì?",
    "options": {
      "A": "Mua ngay vì nó rẻ và có màu sắc bắt mắt.",
      "B": "Từ chối mua, giải thích cho bạn: \"Đồ chơi không nhãn mác, không nguồn gốc xuất xứ rõ ràng có thể chứa hóa chất độc hại gây dị ứng da tay nguy hiểm\".",
      "C": "Lấy trộm tiền của bố mẹ mua cho bạn cùng chơi.",
      "D": "Mua về nghịch thử, nếu bị ngứa tay mới vứt đi."
    },
    "answer": "B",
    "explanation": "Bảo vệ sức khỏe cá nhân khỏi các sản phẩm độc hại, giá rẻ, không nguồn gốc xuất xứ là tiêu chuẩn hàng đầu của tiêu dùng thông minh và an toàn.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_20",
    "number": 20,
    "question": "Khi em thấy nhãn chai nước rửa bát ghi \"Thành phần 100% tự nhiên chiết xuất từ chanh\". Để kiểm chứng thông tin quảng cáo này, em nên làm gì?",
    "options": {
      "A": "Tin ngay vì thông tin in nổi bật ở mặt trước của chai nước.",
      "B": "Lật mặt sau đọc bảng thành phần chi tiết (Ingredients) để xem có chứa nhiều hóa chất tẩy rửa công nghiệp không, kiểm tra các chứng nhận an toàn hữu cơ (nếu có).",
      "C": "Uống thử một ngụm xem có vị chanh tự nhiên thật không.",
      "D": "Mắng chửi nhà sản xuất vì tội ghi thông tin quá nhỏ ở mặt sau."
    },
    "answer": "B",
    "explanation": "Mặt trước bao bì thường là thông tin tiếp thị (marketing claims). Bảng thành phần chi tiết ở mặt sau mới cung cấp dữ liệu kỹ thuật thực tế giúp kiểm chứng độ tin cậy của quảng cáo.",
    "topic": "CHỦ ĐỀ 2: MUA SẮM THÔNG MINH & NGƯỜI TIÊU DÙNG THÔNG THÁI",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_21",
    "number": 21,
    "question": "Tại sao việc thực hành \"Tiết kiệm tiền bạc\" từ khi còn nhỏ lại cực kỳ quan trọng đối với học sinh?",
    "options": {
      "A": "Để giúp em trở nên giàu có hơn tất cả mọi người trong xóm.",
      "B": "Giúp hình thành thói quen kỷ luật tự giác, trân trọng sức lao động của cha mẹ, tích lũy nguồn tài chính dự phòng cho các trường hợp khẩn cấp hoặc thực hiện mục tiêu tương lai.",
      "C": "Để không phải làm việc nhà giúp đỡ bố mẹ nữa.",
      "D": "Giúp em được nhà trường tuyên dương khen ngợi trước lớp học."
    },
    "answer": "B",
    "explanation": "Tiết kiệm không đơn giản là trữ tiền, mà là rèn luyện tư duy trì hoãn sự sung sướng ngắn hạn (delayed gratification) để đạt được những mục tiêu lớn dài hạn hơn.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_22",
    "number": 22,
    "question": "Để ghi chép \"Sổ chi tiêu cá nhân\" hiệu quả, em cần ghi lại những thông tin cơ bản nào sau đây hàng ngày?",
    "options": {
      "A": "Tên những người bạn đã đi chơi cùng mình hôm nay.",
      "B": "Ngày tháng thực hiện giao dịch, Số tiền thu vào (bố mẹ cho, tiền thưởng), Số tiền chi ra (mua bút, mua kẹo) và Số tiền còn lại (số dư).",
      "C": "Danh sách các bài tập về nhà môn Toán của ngày hôm nay.",
      "D": "Những mong muốn em muốn mua trong tương lai."
    },
    "answer": "B",
    "explanation": "Ghi chép sổ chi tiêu (cash flow tracking) giúp học sinh trực quan hóa dòng tiền cá nhân, từ đó biết rõ mình đã tiêu tiền vào việc gì và điều chỉnh kế hoạch tài chính hợp lý.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_23",
    "number": 23,
    "question": "Mỗi ngày khi đi học về còn thừa 2.000 đồng tiền lẻ lẻ lẻ lẻ tiêu vặt, em cẩn thận bỏ vào chú heo đất tiết kiệm đặt trên bàn học. Hành vi này thể hiện điều gì?",
    "options": {
      "A": "Sự kiên trì rèn luyện thói quen tích lũy đều đặn (tích tiểu thành đại) để thực hiện các kế hoạch mua sắm hữu ích trong tương lai.",
      "B": "Việc em lười đi mua kẹo ngọt ăn vặt ngoài cổng trường.",
      "C": "Việc em muốn khoe khoang chú heo đất của mình to lớn hơn bạn.",
      "D": "Sự lãng phí tiền bạc lẻ lẻ không đáng có."
    },
    "answer": "A",
    "explanation": "Tiết kiệm bắt đầu từ những khoản tiền rất nhỏ hàng ngày. Sự đều đặn (consistency) quan trọng hơn số lượng tiền tích lũy ban đầu rất nhiều.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_24",
    "number": 24,
    "question": "Khi sổ chi tiêu cá nhân cuối tháng báo cáo số tiền chi ra của em lớn hơn số tiền thu vào (bị thâm hụt ngân sách). Em nên điều chỉnh thế nào vào tháng tới?",
    "options": {
      "A": "Xin thêm nhiều tiền tiêu vặt hơn từ bố mẹ để bù đắp thâm hụt.",
      "B": "Cắt giảm các khoản chi cho nhóm \"Mong muốn\" (như mua kẹo, đồ chơi, truyện tranh) và tập trung giữ lại tiền cho các nhu cầu thiết yếu.",
      "C": "Ngừng việc ghi chép sổ chi tiêu vì thấy nó quá phiền phức.",
      "D": "Đi mượn tiền của các bạn cùng lớp để tiêu xài tiếp."
    },
    "answer": "B",
    "explanation": "Khi ngân sách bị thâm hụt, cắt giảm chi phí không thiết yếu (wants) là biện pháp cốt lõi để khôi phục cân bằng tài chính cá nhân.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_25",
    "number": 25,
    "question": "Đâu là một ví dụ về lợi ích của \"Khoản tiền tiết kiệm khẩn cấp\" đối với học sinh tiểu học?",
    "options": {
      "A": "Có tiền mua ngay chiếc máy chơi game mới phát hành ngoài cửa hàng.",
      "B": "Tự mua lại được chiếc kính cận mới bị vô ý làm gãy trong giờ ra chơi để kịp học bài mà không làm ảnh hưởng ngân sách gia đình của bố mẹ.",
      "C": "Có tiền đi bao các bạn trong lớp ăn uống để khẳng định bản thân.",
      "D": "Dùng tiền để mua chuộc bạn khác làm bài tập hộ mình."
    },
    "answer": "B",
    "explanation": "Tiết kiệm khẩn cấp (emergency fund) giúp giải quyết các rủi ro phát sinh bất ngờ trong cuộc sống học đường một cách chủ động và tự lập nhất.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_26",
    "number": 26,
    "question": "Việc sử dụng điện và nước tiết kiệm tại gia đình mang lại lợi ích gì cho kinh tế và môi trường?",
    "options": {
      "A": "Giúp giảm hóa đơn tiền điện nước hàng tháng của bố mẹ và bảo vệ tài nguyên thiên nhiên của Trái Đất khỏi bị cạn kiệt.",
      "B": "Giúp nhà em trở nên tối tăm mát mẻ hơn nhà hàng xóm.",
      "C": "Để nhà máy điện nước không phải hoạt động mệt mỏi.",
      "D": "Không mang lại lợi ích gì đáng kể."
    },
    "answer": "A",
    "explanation": "Tiết kiệm tài nguyên (điện, nước, giấy viết) là hành động thực hành trách nhiệm kép: vừa giảm chi phí tài chính cho gia đình vừa bảo vệ môi trường sinh thái.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_27",
    "number": 27,
    "question": "Khi em viết nhật ký sổ chi tiêu bằng sơ đồ hình vẽ cột để mô tả lượng tiền chi tiêu mỗi tuần. Phương pháp này giúp ích gì cho tư duy học tập?",
    "options": {
      "A": "Giúp học sinh vẽ tranh tô màu đẹp mắt hơn.",
      "B": "Trực quan hóa dữ liệu (data visualization), giúp dễ dàng so sánh xu hướng tiêu dùng giữa các tuần để có sự điều chỉnh chi tiêu nhanh chóng.",
      "C": "Để nộp cho cô giáo môn Toán chấm điểm nâng cao.",
      "D": "Làm tốn thời gian học bài của em."
    },
    "answer": "B",
    "explanation": "Sử dụng sơ đồ hình cột hoặc hình tròn để biểu diễn tài chính giúp phát triển tư duy toán học thực tế và năng lực phân tích dữ liệu trực quan cho học sinh.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_28",
    "number": 28,
    "question": "Nhận định nào sau đây là SAI về việc thực hành tiết kiệm?",
    "options": {
      "A": "Tiết kiệm là hành vi chỉ dành cho những gia đình nghèo khó, gia đình giàu có thì không cần tiết kiệm.",
      "B": "Tiết kiệm giúp chúng ta chủ động trước các rủi ro bất ngờ trong tương lai.",
      "C": "Tiết kiệm thể hiện lối sống văn minh, biết trân trọng giá trị sức lao động của gia đình.",
      "D": "Nuôi heo đất là một phương pháp tiết kiệm tiền mặt dễ thực hiện và hiệu quả đối với học sinh."
    },
    "answer": "A",
    "explanation": "Tiết kiệm là tư duy quản lý tài chính phổ quát dành cho mọi đối tượng. Quản lý tài chính tốt giúp bảo vệ và phát triển tài sản bền vững cho tương lai.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_29",
    "number": 29,
    "question": "Em thấy một chiếc balo đi học cũ của mình hơi sờn góc nhưng vẫn dùng rất chắc chắn và bền đẹp. Hành động thể hiện tinh thần tiết kiệm là:",
    "options": {
      "A": "Đòi bố mẹ mua cho chiếc balo mới có hình siêu nhân lấp lánh để đi học.",
      "B": "Tiếp tục sử dụng chiếc balo cũ sạch sẽ ngăn nắp, dành tiền đó cho các mục tiêu học tập quan trọng khác của năm học mới.",
      "C": "Cố tình dùng kéo rạch rách balo cũ để ép bố mẹ phải mua balo mới.",
      "D": "Vứt balo cũ vào sọt rác học đường."
    },
    "answer": "B",
    "explanation": "Tránh chạy theo xu hướng tiêu dùng nhanh, trân trọng và bảo quản đồ dùng cũ vẫn dùng tốt là thói quen sống xanh và tiết kiệm tài chính văn minh.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_30",
    "number": 30,
    "question": "Câu nói nào thể hiện tư duy thông minh nhất về việc tiết kiệm tiền?",
    "options": {
      "A": "\"Hãy tiêu hết tiền mình thích trước, còn thừa bao nhiêu thì mang đi tiết kiệm\".",
      "B": "\"Hãy trích ngay một phần tiền để tiết kiệm trước khi bắt đầu chi tiêu cho các nhu cầu khác\".",
      "C": "\"Chỉ tiết kiệm tiền khi nào bị bố mẹ bắt buộc phạt thôi\".",
      "D": "\"Không cần tiết kiệm, có tiền thì cứ tiêu thoải mái cho đã đời\"."
    },
    "answer": "B",
    "explanation": "Công thức tài chính vàng: Thu nhập - Tiết kiệm = Chi tiêu. Việc ưu tiên tích lũy trước khi tiêu xài giúp bảo vệ mục tiêu tài chính dài hạn của cá nhân vững chắc.",
    "topic": "CHỦ ĐỀ 3: TIẾT KIỆM & QUẢN LÝ SỔ CHI TIÊU",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_31",
    "number": 31,
    "question": "Đâu là danh sách các \"Thông tin cá nhân nhạy cảm\" em tuyệt đối KHÔNG ĐƯỢC chia sẻ công khai lên mạng internet hoặc cho người lạ biết?",
    "options": {
      "A": "Họ tên đầy đủ, ngày tháng năm sinh, địa chỉ nhà riêng, số điện thoại của bố mẹ, mật khẩu tài khoản học tập và vị trí lớp học của em.",
      "B": "Danh sách các nhân vật hoạt hình em thích xem nhất trên tivi.",
      "C": "Màu sắc yêu thích của chiếc xe đạp em đi hàng ngày.",
      "D": "Tên của con mèo cưng nuôi ở nhà của em."
    },
    "answer": "A",
    "explanation": "Chia sẻ thông tin cá nhân định danh (PII) lên không gian mạng tạo cơ hội cho kẻ xấu lợi dụng để định vị bắt cóc, lừa đảo gia đình hoặc quấy rối trực tuyến.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_32",
    "number": 32,
    "question": "Đâu là một phương pháp tạo \"Mật khẩu\" (Password) mạnh và an toàn để bảo vệ tài khoản học tập trực tuyến của em?",
    "options": {
      "A": "Sử dụng ngày sinh của em (ví dụ: 12052016) hoặc dãy số đơn giản (123456).",
      "B": "Sử dụng họ tên không dấu của em (nguyenvana).",
      "C": "Kết hợp chữ viết hoa, chữ viết thường, chữ số và ký tự đặc biệt (ví dụ: Tuan@2026#) và không chia sẻ mật khẩu này cho bất kỳ ai (trừ bố mẹ).",
      "D": "Viết mật khẩu lên tờ giấy dán ngay trước bàn học để các bạn cùng biết."
    },
    "answer": "C",
    "explanation": "Mật khẩu mạnh giúp bảo vệ tài khoản khỏi bị hacker bẻ khóa (brute force). Việc bảo mật mật khẩu là kỹ năng số cốt lõi để giữ an toàn trực tuyến.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_33",
    "number": 33,
    "question": "Em đang chơi game online và thấy một tài khoản bạn game lạ nhắn tin: \"Chào bạn, tớ thấy bạn chơi rất giỏi! Bạn cho tớ xin số điện thoại và địa chỉ nhà để tớ gửi quà tặng bạn nhé\". Em nên xử lý thế nào?",
    "options": {
      "A": "Vui vẻ cung cấp ngay địa chỉ nhà riêng và số điện thoại của bố mẹ để được nhận quà sớm.",
      "B": "Lùi lại giữ cảnh giác, KHÔNG cung cấp bất kỳ thông tin nào, báo cáo tài khoản đó và chia sẻ câu chuyện ngay với bố mẹ để nhận lời khuyên bảo an toàn.",
      "C": "Cung cấp thông tin địa chỉ nhà của bạn hàng xóm để bạn nhận quà hộ.",
      "D": "Nhắn tin chửi bới người lạ đó."
    },
    "answer": "B",
    "explanation": "Kẻ xấu thường dùng mồi nhử quà tặng ảo trong game để dụ dỗ học sinh cung cấp thông tin liên lạc phục vụ ý đồ lừa đảo hoặc tiếp cận xâm hại thể chất.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_34",
    "number": 34,
    "question": "Khi sử dụng mạng xã hội, hành vi nào dưới đây được coi là an toàn và thông minh số?",
    "options": {
      "A": "Chấp nhận kết bạn với tất cả mọi người lạ mặt gửi yêu cầu kết bạn.",
      "B": "Thiết lập tài khoản ở chế độ riêng tư (Private), chỉ kết bạn với những người em biết rõ ngoài đời thực và luôn hỏi ý kiến bố mẹ trước khi đăng tải nội dung.",
      "C": "Tự ý đăng video quay cảnh trong nhà riêng của mình lên mạng công cộng.",
      "D": "Chia sẻ liên kết của các trang web không rõ nguồn gốc chứa nhiều quảng cáo độc hại."
    },
    "answer": "B",
    "explanation": "Quản lý danh tính số (digital identity management) bằng việc cài đặt riêng tư và kiểm soát vòng kết nối giúp giảm thiểu tối đa các rủi ro mất an toàn thông tin.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_35",
    "number": 35,
    "question": "Khi đang tìm kiếm tài liệu học tập trên mạng, một trang web hiển thị quảng cáo hình ảnh bạo lực, rùng rợn hoặc nhạy cảm của người lớn. Đây là loại nội dung gì?",
    "options": {
      "A": "Nội dung giải trí kích thích trí thông minh của học sinh.",
      "B": "Nội dung không an toàn, không lành mạnh và không phù hợp với lứa tuổi học sinh tiểu học; em cần tắt ngay trang web đó và báo cáo bố mẹ hỗ trợ lọc chặn.",
      "C": "Tài liệu khoa học phục vụ bài học sinh học cơ thể.",
      "D": "Trò chơi vui vẻ giúp thư giãn đầu óc sau giờ học bài."
    },
    "answer": "B",
    "explanation": "Nhận diện và chủ động tránh xa các nội dung độc hại (inappropriate content) giúp bảo vệ tinh thần học sinh lành mạnh khỏi những ám ảnh tâm lý tiêu cực.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_36",
    "number": 36,
    "question": "Tại sao em tuyệt đối không nên chia sẻ mật khẩu tài khoản học tập trực tuyến (ví dụ tài khoản LMS, MS Teams) của mình cho bạn thân cùng lớp?",
    "options": {
      "A": "Vì bạn thân sẽ học giỏi hơn em nhờ tài khoản đó.",
      "B": "Vì bạn có thể vô ý làm lộ mật khẩu cho người khác, hoặc tự ý đăng nhập đăng tải nội dung sai trái dưới danh nghĩa của em làm ảnh hưởng uy tín cá nhân của em.",
      "C": "Vì chia sẻ mật khẩu sẽ làm tài khoản bị trừ tiền học phí.",
      "D": "Không có lý do gì, chia sẻ mật khẩu cho bạn là hành động tốt."
    },
    "answer": "B",
    "explanation": "Mật khẩu cá nhân là khóa bảo mật duy nhất của tài khoản. Chia sẻ tài khoản làm mất tính bảo mật và dễ dẫn đến các rắc rối trách nhiệm pháp lý học đường khi có sự cố xảy ra.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_37",
    "number": 37,
    "question": "Em thấy một tài khoản lạ gửi một liên kết (link) qua ứng dụng nhắn tin chat kèm thông điệp: \"Nhấp vào đây để nhận 500 kim cương game miễn phí!\". Hành động đúng đắn là:",
    "options": {
      "A": "Nhấp vào link ngay để có kim cương mua trang phục game.",
      "B": "KHÔNG nhấp vào link, nhận diện đây là liên kết độc hại chứa virus đánh cắp thông tin tài khoản, xóa tin nhắn và báo cho bố mẹ kiểm tra.",
      "C": "Chia sẻ liên kết đó vào nhóm chat của lớp để mọi người cùng nhận quà.",
      "D": "Nhấp vào link và làm theo hướng dẫn nhập mật khẩu tài khoản facebook của mình vào."
    },
    "answer": "B",
    "explanation": "Đây là hình thức lừa đảo tặng quà ảo để cài mã độc (malware) hoặc đánh cắp tài khoản (phishing). Cảnh giác trước các liên kết lạ giúp bảo vệ thiết bị gia đình an toàn.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_38",
    "number": 38,
    "question": "Khi đăng tải hình ảnh mặc quần áo đồng phục trường học lên mạng xã hội, nguy cơ an toàn nào dễ xảy ra?",
    "options": {
      "A": "Làm hỏng chất lượng vải của bộ quần áo đồng phục.",
      "B": "Kẻ xấu có thể nhận diện được tên trường học, khu vực em sinh sống và giờ tan học của em để tiếp cận thực hiện hành vi bắt cóc hoặc bắt nạt trực tiếp.",
      "C": "Bị nhà trường xử phạt kỷ luật vì tội mặc đồng phục chụp ảnh.",
      "D": "Không có nguy cơ gì, đăng ảnh mặc đồng phục nhìn rất đẹp."
    },
    "answer": "B",
    "explanation": "Đồng phục chứa thông tin định vị địa điểm học tập của học sinh. Hạn chế đăng ảnh rõ logo trường học công khai giúp bảo vệ an toàn vật lý của học sinh ngoài đời thực.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_39",
    "number": 39,
    "question": "Đâu là nguyên tắc ứng xử đúng đắn khi em muốn sử dụng camera của máy tính để gọi điện video học nhóm cùng bạn?",
    "options": {
      "A": "Bật camera thoải mái bất kể xung quanh nhà đang bừa bộn hoặc các thành viên gia đình đang sinh hoạt riêng tư phía sau.",
      "B": "Chọn không gian ngồi học yên tĩnh, đủ sáng, dọn dẹp không gian phía sau gọn gàng, mặc trang phục lịch sự và tắt camera khi có việc riêng tư gia đình xảy ra.",
      "C": "Hướng camera ra ngoài đường để các bạn ngắm phong cảnh.",
      "D": "Không bao giờ bật camera dù cô giáo yêu cầu kiểm tra bài học."
    },
    "answer": "B",
    "explanation": "Phép lịch sự sử dụng video call (webcam etiquette) yêu cầu sự tôn trọng không gian riêng tư của bản thân, gia đình và giữ hình ảnh học tập nghiêm túc, văn minh.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_40",
    "number": 40,
    "question": "Khi em sử dụng thiết bị ipad của mẹ để xem hoạt hình và thấy hiển thị cảnh báo: \"Ipad của bạn đang bị nhiễm 10 loại virus nguy hiểm! Nhấp vào đây để tải phần mềm diệt virus ngay\". Em nên làm gì?",
    "options": {
      "A": "Lo lắng nhấp vào nút tải về ngay để cứu máy tính của mẹ khỏi bị hỏng.",
      "B": "Giữ bình tĩnh, không nhấp vào bất kỳ nút nào, nhận diện đây là quảng cáo lừa đảo giật gân (scareware) để dụ tải phần mềm độc hại, tắt tab duyệt web đi và báo lại mẹ xử lý.",
      "C": "Ném chiếc ipad xuống đất vì quá sợ hãi máy bị nổ.",
      "D": "Khóc lóc bắt đền mẹ vì đưa máy hỏng cho mình xem."
    },
    "answer": "B",
    "explanation": "Quảng cáo dọa dẫm (scareware) lợi dụng sự hoảng sợ của người dùng để dẫn dụ họ cài đặt các ứng dụng gián điệp độc hại. Giữ bình tĩnh và bỏ qua quảng cáo là cách xử lý đúng đắn.",
    "topic": "CHỦ ĐỀ 4: BẢO MẬT THÔNG TIN CÁ NHÂN & AN TOÀN SỐ",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_41",
    "number": 41,
    "question": "Thế nào là \"Tin giả\" (Fake News) trên không gian mạng internet?",
    "options": {
      "A": "Những thông tin, tin tức sai sự thật hoàn toàn hoặc được cố tình viết sai lệch, bóp méo nội dung để đánh lừa người đọc vì mục đích câu view, lừa đảo hoặc trục lợi.",
      "B": "Những thông tin khoa học khó hiểu trong sách giáo khoa Vật lý.",
      "C": "Những bài hát tiếng Anh vui nhộn dành cho thiếu nhi.",
      "D": "Các video hướng dẫn học sinh làm đồ thủ công mỹ thuật tại nhà."
    },
    "answer": "A",
    "explanation": "Tin giả thiết kế rất giống tin thật để thao túng cảm xúc người đọc (thường là giật gân, dọa dẫm). Nhận diện được bản chất tin giả giúp bảo vệ tư duy học sinh lành mạnh.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_42",
    "number": 42,
    "question": "Em nhận được một tin nhắn Zalo từ một tài khoản mạo danh hình đại diện và họ tên của cô giáo chủ nhiệm lớp yêu cầu: \"Cô đang bận, em nhờ bố mẹ chuyển khoản gấp 200.000đ đóng tiền quỹ lớp vào số tài khoản này nhé\". Cách xác minh an toàn là gì?",
    "options": {
      "A": "Bảo bố mẹ chuyển tiền ngay lập tức vì sợ cô giáo phê bình.",
      "B": "Nhận diện nguy cơ lừa đảo mạo danh đóng tiền; bảo bố mẹ gọi điện trực tiếp bằng số điện thoại của cô giáo hoặc nhắn tin riêng để xác minh thông tin trước khi chuyển bất kỳ khoản tiền nào.",
      "C": "Trích tiền tiết kiệm heo đất của mình tự đi gửi bưu điện đóng tiền.",
      "D": "Bỏ học tiết học của cô giáo vì nghĩ cô tham lam đòi tiền."
    },
    "answer": "B",
    "explanation": "Đây là thủ đoạn lừa đảo mạng xã hội chiếm đoạt tài sản bằng cách giả mạo giáo viên/người thân rất phổ biến. Quy trình bắt buộc là phải gọi điện trực tiếp để xác minh thực tế.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_43",
    "number": 43,
    "question": "Khi đọc một bài viết giật gân trên mạng xã hội: \"Tất cả các trường học sẽ được nghỉ học 1 năm bắt đầu từ ngày mai do thời tiết nóng lên\". Làm thế nào để em kiểm chứng độ tin cậy của tin tức này?",
    "options": {
      "A": "Tin ngay vì tin tức này rất hấp dẫn và đúng mong muốn được nghỉ học của mình.",
      "B": "Tra cứu thông tin trên các kênh báo chí chính thống của quốc gia, Cổng thông tin của Bộ Giáo dục và Đào tạo hoặc hỏi trực tiếp giáo viên chủ nhiệm lớp để xác nhận thông tin chuẩn xác.",
      "C": "Chia sẻ bài viết ngay vào nhóm chat của lớp để rủ các bạn cùng ăn mừng.",
      "D": "Viết bài bình luận chê bai nhà trường bắt học sinh đi học nhiều."
    },
    "answer": "B",
    "explanation": "Đánh giá tính chính xác của tin tức học đường dựa trên các công bố chính thống từ các cơ quan quản lý nhà nước có thẩm quyền chứ không dựa trên các tin đồn vô căn cứ trên mạng xã hội.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_44",
    "number": 44,
    "question": "Em nhận được cuộc gọi từ số máy lạ mạo danh công an báo: \"Bố mẹ cháu đang vi phạm pháp luật nghiêm trọng, cháu hãy đọc ngay mật khẩu ứng dụng ngân hàng của bố mẹ trên điện thoại để công an kiểm tra\". Em nên xử lý thế nào?",
    "options": {
      "A": "Sợ hãi khóc lóc và đọc ngay mật khẩu tài khoản cho người kia nghe.",
      "B": "Bình tĩnh, KHÔNG cung cấp bất kỳ thông tin nào, tắt máy cuộc gọi và báo ngay lập tức cho bố mẹ hoặc cơ quan công an gần nhất biết để xử lý hành vi lừa đảo đe dọa.",
      "C": "Đi tìm ví tiền của bố mẹ mang giấu đi chỗ khác.",
      "D": "Gọi lại số điện thoại đó để chửi cãi nhau với họ."
    },
    "answer": "B",
    "explanation": "Cơ quan công an hay ngân hàng tuyệt đối không làm việc qua điện thoại yêu cầu cung cấp mật khẩu/OTP tài khoản. Nhận diện cuộc gọi đe dọa giúp bảo vệ tài sản gia đình an toàn.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_45",
    "number": 45,
    "question": "Một trang web chia sẻ phương pháp chữa bệnh: \"Chỉ cần dán lá khoai tây lên trán là hết hoàn toàn bệnh sốt xuất huyết\". Bài viết không có ý kiến của bác sĩ y khoa. Lựa chọn ứng xử đúng là:",
    "options": {
      "A": "Thực hiện theo ngay khi trong nhà có người bị sốt xuất huyết.",
      "B": "Nhận diện đây là tin tức giả mạo, phản khoa học có thể gây nguy hiểm tính mạng nếu áp dụng; khuyên người thân đến bệnh viện khám và không chia sẻ bài viết độc hại này.",
      "C": "Mua thật nhiều khoai tây về tích trữ trong nhà.",
      "D": "Đi nói xấu người viết bài chữa bệnh bằng khoai tây."
    },
    "answer": "B",
    "explanation": "Các thông tin y khoa sai lệch tràn lan trên mạng xã hội rất nguy hại. Việc khám chữa bệnh bắt buộc phải tuân thủ chỉ định từ bác sĩ chuyên môn tại các cơ sở y tế uy tín.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_46",
    "number": 46,
    "question": "Đâu là dấu hiệu nhận biết một trang web mua sắm trực tuyến có hành vi lừa đảo, giả mạo?",
    "options": {
      "A": "Trang web có thiết kế sơ sài, địa chỉ URL chứa ký tự lạ (ví dụ: shopee-nhan-qua-free.com), không có thông tin liên hệ rõ ràng và yêu cầu nhập thông tin thẻ ngân hàng trước khi mua.",
      "B": "Trang web có hiển thị đầy đủ chứng nhận \"Đã thông báo Bộ Công Thương\" ở chân trang và địa chỉ URL đúng tên thương hiệu (shopee.vn).",
      "C": "Trang web có dịch vụ chăm sóc khách hàng gọi điện tư vấn chu đáo.",
      "D": "Trang web bán hàng có giá tiền niêm yết rõ ràng từng sản phẩm."
    },
    "answer": "A",
    "explanation": "Các trang web giả mạo (phishing websites) thường thiết kế giao diện giống trang thật nhưng địa chỉ tên miền (URL) có ký tự sai khác nhỏ để lừa người dùng nhập thông tin tài khoản.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_47",
    "number": 47,
    "question": "Em thấy một tài khoản tiktok đăng tải video hướng dẫn: \"Cách làm pháo tự chế bằng diêm tại nhà cực kỳ dễ dàng và an toàn\". Thái độ sử dụng công nghệ trách nhiệm là gì?",
    "options": {
      "A": "Làm theo hướng dẫn video ngay để chế pháo chơi vào dịp Tết.",
      "B": "KHÔNG làm theo, nhận diện đây là hành vi vi phạm pháp luật nguy hiểm (chế tạo chất gây nổ), nhấn nút báo cáo vi phạm (report) video đó vì nội dung nguy hiểm để Tiktok gỡ bỏ.",
      "C": "Chia sẻ video cho các bạn cùng lớp để các bạn cùng chế tạo pháo chơi chung.",
      "D": "Viết bình luận khen ngợi chủ tài khoản tiktok sáng tạo giỏi."
    },
    "answer": "B",
    "explanation": "Chế tạo pháo nổ tự chế cực kỳ nguy hiểm, dễ gây bỏng nặng đứt lìa tay và vi phạm pháp luật. Học sinh cần báo cáo gỡ bỏ các video nội dung nguy hại này bảo vệ cộng đồng.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_48",
    "number": 48,
    "question": "Khi đọc một bài viết chia sẻ trên Facebook, làm thế nào để nhận biết bài viết có phải là \"Tin vịt\" (hoang tin) hay không?",
    "options": {
      "A": "Xem bài viết có nhiều lượt thả tim và chia sẻ không.",
      "B": "Xem bài viết có ghi rõ nguồn trích dẫn uy tín không, có lỗi chính tả ngớ ngẩn không, hình ảnh có bị cắt ghép chỉnh sửa lộ liễu không và thông tin có quá giật gân, vô lý không.",
      "C": "Xem bài viết được đăng bởi một nick ảo không có hình đại diện thực tế.",
      "D": "Cả B và C đều đúng."
    },
    "answer": "D",
    "explanation": "Tin vịt thường do các tài khoản ảo đăng tải, thiếu nguồn tin cậy, giật gân và thường mắc nhiều lỗi chính tả do sao chép cẩu thả. Xác minh các yếu tố này giúp nhận diện tin giả nhanh chóng.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_49",
    "number": 49,
    "question": "Kẻ xấu mạo danh nhân vật game gửi tin nhắn: \"Bạn ơi cho tớ mượn tài khoản game của bạn 5 phút để tớ thử trang phục mới nhé, tớ sẽ trả lại ngay\". Em nên làm gì?",
    "options": {
      "A": "Đồng ý cho bạn mượn tài khoản ngay vì muốn chia sẻ tình bạn game.",
      "B": "Từ chối kiên quyết: \"Tớ không cho mượn tài khoản cá nhân đâu nhé!\" vì mượn tài khoản là thủ đoạn lừa đảo chiếm đoạt tài khoản game phổ biến trên mạng xã hội.",
      "C": "Cho bạn mượn và cung cấp luôn cả mật khẩu hòm thư cá nhân của mình.",
      "D": "Hẹn bạn ra quán nét để giao tài khoản trực tiếp."
    },
    "answer": "B",
    "explanation": "Mượn tài khoản game/mạng xã hội là chiêu thức quen thuộc của kẻ xấu để chiếm quyền kiểm soát (hack nick), sau đó nhắn tin lừa đảo nạp thẻ điện thoại tới danh sách bạn bè của em.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  },
  {
    "id": "Quản_lý_tài_chính_&_An_toàn_số_50",
    "number": 50,
    "question": "Để trở thành một \"Công dân số chính trực và thông thái\", hành động nào em cần thực hiện hàng ngày khi sử dụng internet?",
    "options": {
      "A": "Tích cực tham gia chia sẻ tất cả các thông tin giật gân đọc được trên mạng mà không cần kiểm chứng.",
      "B": "Bảo mật thông tin cá nhân an toàn; tôn trọng bản quyền tác giả; ứng xử lịch thiệp văn minh trên mạng xã hội; tư duy phản biện trước tin tức và luôn tuân thủ các quy tắc an toàn số dưới sự đồng hành hướng dẫn của cha mẹ.",
      "C": "Thức khuya cày game online và xem tiktok suốt đêm.",
      "D": "Từ chối sử dụng mọi thiết bị công nghệ hiện đại để giữ an toàn tuyệt đối."
    },
    "answer": "B",
    "explanation": "Đây là định nghĩa toàn diện về Năng lực số (Digital Competency) dành cho thế hệ học sinh tiểu học thế kỷ 21, giúp các em khai thác công nghệ hiệu quả và an toàn nhất để học tập và phát triển bản thân.",
    "topic": "CHỦ ĐỀ 5: NHẬN DIỆN TIN GIẢ & PHÒNG CHỐNG LỪA ĐẢO TRỰC TUYẾN",
    "group": "Quản lý tài chính & An toàn số"
  }
];