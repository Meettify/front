const mockOrderList = [
    {
      orderId: 1,
      orderAddress: {
        memberAddr: "서울특별시 강남구 테헤란로",
        memberAddrDetail: "OOO빌딩 3층",
        memberZipCode: "06241",
      },
      orderTotalPrice: 50000,
      orderItems: [
        {
          orderItemId: 1,
          orderCount: 2,
          orderPrice: 25000,
          item: {
            itemId: 101,
            itemName: "Apple AirPods",
            itemPrice: 12500,
            itemDetails: "무선 이어폰, 블루투스 지원",
            itemStatus: "AVAILABLE",
            images: [
              {
                itemImgId: 1,
                uploadImgPath: "/images/airpods.png",
                originalImgName: "airpods_original.png",
                uploadImgUrl: "https://example.com/images/airpods.png",
              },
            ],
            itemCount: 10,
            itemCategory: "ELECTRONICS",
          },
        },
      ],
      orderUUIDId: "abc123-def456",
      orderTime: "2024-11-01 10:30:00",
      payStatus: "결제 완료",
    },
    {
      orderId: 2,
      orderAddress: {
        memberAddr: "부산광역시 해운대구",
        memberAddrDetail: "OOO 아파트 101동 202호",
        memberZipCode: "48094",
      },
      orderTotalPrice: 30000,
      orderItems: [
        {
          orderItemId: 2,
          orderCount: 1,
          orderPrice: 30000,
          item: {
            itemId: 102,
            itemName: "Samsung Galaxy Buds",
            itemPrice: 30000,
            itemDetails: "무선 이어폰, 소음 차단",
            itemStatus: "AVAILABLE",
            images: [
              {
                itemImgId: 2,
                uploadImgPath: "/images/galaxy_buds.png",
                originalImgName: "galaxy_buds_original.png",
                uploadImgUrl: "https://example.com/images/galaxy_buds.png",
              },
            ],
            itemCount: 15,
            itemCategory: "ELECTRONICS",
          },
        },
      ],
      orderUUIDId: "ghi789-jkl012",
      orderTime: "2024-11-02 14:20:00",
      payStatus: "결제 완료",
    },
    {
      orderId: 3,
      orderAddress: {
        memberAddr: "인천광역시 남동구",
        memberAddrDetail: "OO빌딩 5층",
        memberZipCode: "21500",
      },
      orderTotalPrice: 70000,
      orderItems: [
        {
          orderItemId: 3,
          orderCount: 1,
          orderPrice: 70000,
          item: {
            itemId: 103,
            itemName: "Sony WH-1000XM4",
            itemPrice: 70000,
            itemDetails: "무선 헤드폰, 노이즈 캔슬링",
            itemStatus: "AVAILABLE",
            images: [
              {
                itemImgId: 3,
                uploadImgPath: "/images/sony_wh1000xm4.png",
                originalImgName: "sony_wh1000xm4_original.png",
                uploadImgUrl: "https://example.com/images/sony_wh1000xm4.png",
              },
            ],
            itemCount: 20,
            itemCategory: "ELECTRONICS",
          },
        },
      ],
      orderUUIDId: "mno123-pqr456",
      orderTime: "2024-11-03 16:45:00",
      payStatus: "결제 완료",
    },
    {
      orderId: 10,
      orderAddress: {
        memberAddr: "대전광역시 유성구",
        memberAddrDetail: "OO 아파트 202동 1802호",
        memberZipCode: "34111",
      },
      orderTotalPrice: 40000,
      orderItems: [
        {
          orderItemId: 10,
          orderCount: 2,
          orderPrice: 20000,
          item: {
            itemId: 110,
            itemName: "Logitech MX Master 3",
            itemPrice: 20000,
            itemDetails: "무선 마우스, 고성능",
            itemStatus: "AVAILABLE",
            images: [
              {
                itemImgId: 10,
                uploadImgPath: "/images/logitech_mx_master3.png",
                originalImgName: "logitech_mx_master3_original.png",
                uploadImgUrl: "https://example.com/images/logitech_mx_master3.png",
              },
            ],
            itemCount: 8,
            itemCategory: "ELECTRONICS",
          },
        },
      ],
      orderUUIDId: "ORDERID10",
      orderTime: "2024-11-10 18:00:00",
      payStatus: "결제 취소",
    },
    {
        orderId: 5,
        orderAddress: {
          memberAddr: "인천광역시 남동구",
          memberAddrDetail: "OO빌딩 5층",
          memberZipCode: "21500",
        },
        orderTotalPrice: 70000,
        orderItems: [
          {
            orderItemId: 3,
            orderCount: 1,
            orderPrice: 70000,
            item: {
              itemId: 103,
              itemName: "Sony WH-1000XM4",
              itemPrice: 70000,
              itemDetails: "무선 헤드폰, 노이즈 캔슬링",
              itemStatus: "AVAILABLE",
              images: [
                {
                  itemImgId: 3,
                  uploadImgPath: "/images/sony_wh1000xm4.png",
                  originalImgName: "sony_wh1000xm4_original.png",
                  uploadImgUrl: "https://example.com/images/sony_wh1000xm4.png",
                },
              ],
              itemCount: 20,
              itemCategory: "ELECTRONICS",
            },
          },
        ],
        orderUUIDId: "mno123-pqr456",
        orderTime: "2024-11-05 16:45:00",
        payStatus: "결제 완료",
      },
      {
        orderId: 6,
        orderAddress: {
          memberAddr: "인천광역시 남동구",
          memberAddrDetail: "OO빌딩 5층",
          memberZipCode: "21500",
        },
        orderTotalPrice: 70000,
        orderItems: [
          {
            orderItemId: 3,
            orderCount: 1,
            orderPrice: 70000,
            item: {
              itemId: 103,
              itemName: "Sony WH-1000XM4",
              itemPrice: 70000,
              itemDetails: "무선 헤드폰, 노이즈 캔슬링",
              itemStatus: "AVAILABLE",
              images: [
                {
                  itemImgId: 3,
                  uploadImgPath: "/images/sony_wh1000xm4.png",
                  originalImgName: "sony_wh1000xm4_original.png",
                  uploadImgUrl: "https://example.com/images/sony_wh1000xm4.png",
                },
              ],
              itemCount: 20,
              itemCategory: "ELECTRONICS",
            },
          },
        ],
        orderUUIDId: "mno123-pqr456",
        orderTime: "2024-11-06 16:45:00",
        payStatus: "결제 완료",
      },
      {
        orderId: 7,
        orderAddress: {
          memberAddr: "인천광역시 남동구",
          memberAddrDetail: "OO빌딩 5층",
          memberZipCode: "21500",
        },
        orderTotalPrice: 70000,
        orderItems: [
          {
            orderItemId: 3,
            orderCount: 1,
            orderPrice: 70000,
            item: {
              itemId: 103,
              itemName: "Sony WH-1000XM4",
              itemPrice: 70000,
              itemDetails: "무선 헤드폰, 노이즈 캔슬링",
              itemStatus: "AVAILABLE",
              images: [
                {
                  itemImgId: 3,
                  uploadImgPath: "/images/sony_wh1000xm4.png",
                  originalImgName: "sony_wh1000xm4_original.png",
                  uploadImgUrl: "https://example.com/images/sony_wh1000xm4.png",
                },
              ],
              itemCount: 20,
              itemCategory: "ELECTRONICS",
            },
          },
        ],
        orderUUIDId: "mno123-pqr456",
        orderTime: "2024-11-07 16:45:00",
        payStatus: "결제 완료",
      },
      {
        orderId: 8,
        orderAddress: {
          memberAddr: "인천광역시 남동구",
          memberAddrDetail: "OO빌딩 5층",
          memberZipCode: "21500",
        },
        orderTotalPrice: 70000,
        orderItems: [
          {
            orderItemId: 3,
            orderCount: 1,
            orderPrice: 70000,
            item: {
              itemId: 103,
              itemName: "Sony WH-1000XM4",
              itemPrice: 70000,
              itemDetails: "무선 헤드폰, 노이즈 캔슬링",
              itemStatus: "AVAILABLE",
              images: [
                {
                  itemImgId: 3,
                  uploadImgPath: "/images/sony_wh1000xm4.png",
                  originalImgName: "sony_wh1000xm4_original.png",
                  uploadImgUrl: "https://example.com/images/sony_wh1000xm4.png",
                },
              ],
              itemCount: 20,
              itemCategory: "ELECTRONICS",
            },
          },
        ],
        orderUUIDId: "mno123-pqr456",
        orderTime: "2024-11-08 16:45:00",
        payStatus: "결제 완료",
      },
      {
        orderId: 9,
        orderAddress: {
          memberAddr: "인천광역시 남동구",
          memberAddrDetail: "OO빌딩 5층",
          memberZipCode: "21500",
        },
        orderTotalPrice: 90000,
        orderItems: [
          {
            orderItemId: 3,
            orderCount: 1,
            orderPrice: 70000,
            item: {
              itemId: 103,
              itemName: "Sony WH-1000XM4",
              itemPrice: 70000,
              itemDetails: "무선 헤드폰, 노이즈 캔슬링",
              itemStatus: "AVAILABLE",
              images: [
                {
                  itemImgId: 3,
                  uploadImgPath: "/images/sony_wh1000xm4.png",
                  originalImgName: "sony_wh1000xm4_original.png",
                  uploadImgUrl: "https://example.com/images/sony_wh1000xm4.png",
                },
              ],
              itemCount: 20,
              itemCategory: "ELECTRONICS",
            },
          },
          {
            orderItemId: 99,
            orderCount: 1,
            orderPrice: 20000,
            item: {
              itemId: 103,
              itemName: "Samsung, C-Type 충전기",
              itemPrice: 20000,
              itemDetails: "C 타입 충전기",
              itemStatus: "AVAILABLE",
              images: [
                {
                  itemImgId: 3,
                  uploadImgPath: "/images/sony_wh1000xm4.png",
                  originalImgName: "sony_wh1000xm4_original.png",
                  uploadImgUrl: "https://example.com/images/sony_wh1000xm4.png",
                },
              ],
              itemCount: 20,
              itemCategory: "ELECTRONICS",
            },
          },
        ],
        orderUUIDId: "mno123-999999999",
        orderTime: "2024-11-09 16:45:00",
        payStatus: "결제 완료",
      },
      {
        orderId: 4,
        orderAddress: {
          memberAddr: "인천광역시 남동구",
          memberAddrDetail: "OO빌딩 5층",
          memberZipCode: "21500",
        },
        orderTotalPrice: 70000,
        orderItems: [
          {
            orderItemId: 3,
            orderCount: 1,
            orderPrice: 70000,
            item: {
              itemId: 103,
              itemName: "Sony WH-1000XM4",
              itemPrice: 70000,
              itemDetails: "무선 헤드폰, 노이즈 캔슬링",
              itemStatus: "AVAILABLE",
              images: [
                {
                  itemImgId: 3,
                  uploadImgPath: "/images/sony_wh1000xm4.png",
                  originalImgName: "sony_wh1000xm4_original.png",
                  uploadImgUrl: "https://example.com/images/sony_wh1000xm4.png",
                },
              ],
              itemCount: 20,
              itemCategory: "ELECTRONICS",
            },
          },
        ],
        orderUUIDId: "mno123-pqr456",
        orderTime: "2024-11-04 16:45:00",
        payStatus: "결제 완료",
      },
      {
        orderId: 11,
        orderAddress: {
          memberAddr: "서울특별시 강남구 테헤란로",
          memberAddrDetail: "OOO빌딩 3층",
          memberZipCode: "06241",
        },
        orderTotalPrice: 55555,
        orderItems: [
          {
            orderItemId: 1,
            orderCount: 2,
            orderPrice: 25000,
            item: {
              itemId: 101,
              itemName: "Apple AirPods",
              itemPrice: 12500,
              itemDetails: "무선 이어폰, 블루투스 지원",
              itemStatus: "AVAILABLE",
              images: [
                {
                  itemImgId: 1,
                  uploadImgPath: "/images/airpods.png",
                  originalImgName: "airpods_original.png",
                  uploadImgUrl: "https://example.com/images/airpods.png",
                },
              ],
              itemCount: 10,
              itemCategory: "ELECTRONICS",
            },
          },
        ],
        orderUUIDId: "ORDERID11",
        orderTime: "2024-11-11 10:30:00",
        payStatus: "결제 완료",
      },
  ];
  
  export default mockOrderList;
  