// Danh sách nhân viên
let danhSachNhanVien = [];

// Class NhanVien
class NhanVien {
    constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = luongCoBan;
        this.chucVu = chucVu;
        this.gioLam = gioLam;
    }

    // Phương thức tính tổng lương
    tinhTongLuong() {
        if (this.chucVu === "Sếp") {
            return this.luongCoBan * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            return this.luongCoBan * 2;
        } else if (this.chucVu === "Nhân viên") {
            return this.luongCoBan * 1;
        }
        return 0;
    }

    // Phương thức xếp loại nhân viên
    xepLoai() {
        if (this.gioLam >= 192) {
            return "Xuất sắc";
        } else if (this.gioLam >= 176) {
            return "Giỏi";
        } else if (this.gioLam >= 160) {
            return "Khá";
        } else {
            return "Trung bình";
        }
    }
}

// Lưu dữ liệu vào localStorage
function luuLocalStorage() {
    localStorage.setItem('danhSachNhanVien', JSON.stringify(danhSachNhanVien));
}

// Lấy dữ liệu từ localStorage
function layLocalStorage() {
    const data = localStorage.getItem('danhSachNhanVien');
    if (data) {
        danhSachNhanVien = JSON.parse(data);
        hienThiDanhSach(danhSachNhanVien);
    }
}

// Hiển thị danh sách nhân viên
function hienThiDanhSach(danhSach) {
    let html = '';
    for (let i = 0; i < danhSach.length; i++) {
        const nv = danhSach[i];
        const nhanVien = new NhanVien(
            nv.taiKhoan,
            nv.hoTen,
            nv.email,
            nv.matKhau,
            nv.ngayLam,
            nv.luongCoBan,
            nv.chucVu,
            nv.gioLam
        );
        
        html += `
            <tr>
                <td>${nhanVien.taiKhoan}</td>
                <td>${nhanVien.hoTen}</td>
                <td>${nhanVien.email}</td>
                <td>${nhanVien.ngayLam}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.tinhTongLuong().toLocaleString('vi-VN')} VNĐ</td>
                <td>${nhanVien.xepLoai()}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="xemChiTiet('${nhanVien.taiKhoan}')">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="xoaNhanVien('${nhanVien.taiKhoan}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }
    document.getElementById('tableDanhSach').innerHTML = html;
}

// Validation
function kiemTraRong(value, idError, message) {
    if (value.trim() === '') {
        document.getElementById(idError).innerHTML = message;
        document.getElementById(idError).style.display = 'block';
        return false;
    }
    document.getElementById(idError).innerHTML = '';
    document.getElementById(idError).style.display = 'none';
    return true;
}

function kiemTraTaiKhoan(value) {
    const regex = /^[0-9]{4,6}$/;
    if (!kiemTraRong(value, 'tbTKNV', 'Tài khoản không được để trống')) {
        return false;
    }
    if (!regex.test(value)) {
        document.getElementById('tbTKNV').innerHTML = 'Tài khoản phải là số từ 4-6 ký tự';
        document.getElementById('tbTKNV').style.display = 'block';
        return false;
    }
    document.getElementById('tbTKNV').innerHTML = '';
    document.getElementById('tbTKNV').style.display = 'none';
    return true;
}

function kiemTraTen(value) {
    const regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    if (!kiemTraRong(value, 'tbTen', 'Tên không được để trống')) {
        return false;
    }
    if (!regex.test(value)) {
        document.getElementById('tbTen').innerHTML = 'Tên phải là chữ';
        document.getElementById('tbTen').style.display = 'block';
        return false;
    }
    document.getElementById('tbTen').innerHTML = '';
    document.getElementById('tbTen').style.display = 'none';
    return true;
}

function kiemTraEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!kiemTraRong(value, 'tbEmail', 'Email không được để trống')) {
        return false;
    }
    if (!regex.test(value)) {
        document.getElementById('tbEmail').innerHTML = 'Email không đúng định dạng';
        document.getElementById('tbEmail').style.display = 'block';
        return false;
    }
    document.getElementById('tbEmail').innerHTML = '';
    document.getElementById('tbEmail').style.display = 'none';
    return true;
}

function kiemTraMatKhau(value) {
    const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
    if (!kiemTraRong(value, 'tbMatKhau', 'Mật khẩu không được để trống')) {
        return false;
    }
    if (!regex.test(value)) {
        document.getElementById('tbMatKhau').innerHTML = 'Mật khẩu 6-10 ký tự, có ít nhất 1 số, 1 chữ hoa, 1 ký tự đặc biệt';
        document.getElementById('tbMatKhau').style.display = 'block';
        return false;
    }
    document.getElementById('tbMatKhau').innerHTML = '';
    document.getElementById('tbMatKhau').style.display = 'none';
    return true;
}

function kiemTraNgayLam(value) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!kiemTraRong(value, 'tbNgay', 'Ngày làm không được để trống')) {
        return false;
    }
    if (!regex.test(value)) {
        document.getElementById('tbNgay').innerHTML = 'Ngày làm định dạng mm/dd/yyyy';
        document.getElementById('tbNgay').style.display = 'block';
        return false;
    }
    document.getElementById('tbNgay').innerHTML = '';
    document.getElementById('tbNgay').style.display = 'none';
    return true;
}

function kiemTraLuongCoBan(value) {
    const luong = parseFloat(value);
    if (!kiemTraRong(value, 'tbLuongCB', 'Lương cơ bản không được để trống')) {
        return false;
    }
    if (isNaN(luong) || luong < 1000000 || luong > 20000000) {
        document.getElementById('tbLuongCB').innerHTML = 'Lương cơ bản từ 1,000,000 - 20,000,000';
        document.getElementById('tbLuongCB').style.display = 'block';
        return false;
    }
    document.getElementById('tbLuongCB').innerHTML = '';
    document.getElementById('tbLuongCB').style.display = 'none';
    return true;
}

function kiemTraChucVu(value) {
    const danhSachChucVu = ['Sếp', 'Trưởng phòng', 'Nhân viên'];
    if (!kiemTraRong(value, 'tbChucVu', 'Chức vụ không được để trống')) {
        return false;
    }
    if (!danhSachChucVu.includes(value)) {
        document.getElementById('tbChucVu').innerHTML = 'Chọn chức vụ hợp lệ';
        document.getElementById('tbChucVu').style.display = 'block';
        return false;
    }
    document.getElementById('tbChucVu').innerHTML = '';
    document.getElementById('tbChucVu').style.display = 'none';
    return true;
}

function kiemTraGioLam(value) {
    const gio = parseFloat(value);
    if (!kiemTraRong(value, 'tbGiolam', 'Giờ làm không được để trống')) {
        return false;
    }
    if (isNaN(gio) || gio < 80 || gio > 200) {
        document.getElementById('tbGiolam').innerHTML = 'Giờ làm từ 80 - 200 giờ';
        document.getElementById('tbGiolam').style.display = 'block';
        return false;
    }
    document.getElementById('tbGiolam').innerHTML = '';
    document.getElementById('tbGiolam').style.display = 'none';
    return true;
}

// Lấy thông tin từ form
function layThongTinNhanVien() {
    const taiKhoan = document.getElementById('tknv').value;
    const hoTen = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const matKhau = document.getElementById('password').value;
    const ngayLam = document.getElementById('datepicker').value;
    const luongCoBan = parseFloat(document.getElementById('luongCB').value);
    const chucVu = document.getElementById('chucvu').value;
    const gioLam = parseFloat(document.getElementById('gioLam').value);

    const nhanVien = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
    return nhanVien;
}

// Xóa form
function xoaForm() {
    document.getElementById('tknv').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('datepicker').value = '';
    document.getElementById('luongCB').value = '';
    document.getElementById('chucvu').value = 'Chọn chức vụ';
    document.getElementById('gioLam').value = '';

    // Xóa thông báo lỗi
    const errors = ['tbTKNV', 'tbTen', 'tbEmail', 'tbMatKhau', 'tbNgay', 'tbLuongCB', 'tbChucVu', 'tbGiolam'];
    errors.forEach(id => {
        document.getElementById(id).innerHTML = '';
        document.getElementById(id).style.display = 'none';
    });
}

// Thêm nhân viên
function themNhanVien() {
    const taiKhoan = document.getElementById('tknv').value;
    const hoTen = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const matKhau = document.getElementById('password').value;
    const ngayLam = document.getElementById('datepicker').value;
    const luongCoBan = document.getElementById('luongCB').value;
    const chucVu = document.getElementById('chucvu').value;
    const gioLam = document.getElementById('gioLam').value;

    // Validation
    const isValid = 
        kiemTraTaiKhoan(taiKhoan) &&
        kiemTraTen(hoTen) &&
        kiemTraEmail(email) &&
        kiemTraMatKhau(matKhau) &&
        kiemTraNgayLam(ngayLam) &&
        kiemTraLuongCoBan(luongCoBan) &&
        kiemTraChucVu(chucVu) &&
        kiemTraGioLam(gioLam);

    if (!isValid) {
        return;
    }

    // Kiểm tra trùng tài khoản
    const index = danhSachNhanVien.findIndex(nv => nv.taiKhoan === taiKhoan);
    if (index !== -1) {
        document.getElementById('tbTKNV').innerHTML = 'Tài khoản đã tồn tại';
        document.getElementById('tbTKNV').style.display = 'block';
        return;
    }

    const nhanVien = layThongTinNhanVien();
    danhSachNhanVien.push(nhanVien);
    luuLocalStorage();
    hienThiDanhSach(danhSachNhanVien);
    xoaForm();
    $('#myModal').modal('hide');
}

// Xóa nhân viên
function xoaNhanVien(taiKhoan) {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
        const index = danhSachNhanVien.findIndex(nv => nv.taiKhoan === taiKhoan);
        if (index !== -1) {
            danhSachNhanVien.splice(index, 1);
            luuLocalStorage();
            hienThiDanhSach(danhSachNhanVien);
        }
    }
}

// Xem chi tiết và cập nhật
function xemChiTiet(taiKhoan) {
    const nhanVien = danhSachNhanVien.find(nv => nv.taiKhoan === taiKhoan);
    if (nhanVien) {
        document.getElementById('tknv').value = nhanVien.taiKhoan;
        document.getElementById('name').value = nhanVien.hoTen;
        document.getElementById('email').value = nhanVien.email;
        document.getElementById('password').value = nhanVien.matKhau;
        document.getElementById('datepicker').value = nhanVien.ngayLam;
        document.getElementById('luongCB').value = nhanVien.luongCoBan;
        document.getElementById('chucvu').value = nhanVien.chucVu;
        document.getElementById('gioLam').value = nhanVien.gioLam;

        document.getElementById('tknv').disabled = true;
        document.getElementById('btnThemNV').style.display = 'none';
        document.getElementById('btnCapNhat').style.display = 'inline-block';

        $('#myModal').modal('show');
    }
}

// Cập nhật nhân viên
function capNhatNhanVien() {
    const taiKhoan = document.getElementById('tknv').value;
    const hoTen = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const matKhau = document.getElementById('password').value;
    const ngayLam = document.getElementById('datepicker').value;
    const luongCoBan = document.getElementById('luongCB').value;
    const chucVu = document.getElementById('chucvu').value;
    const gioLam = document.getElementById('gioLam').value;

    // Validation (bỏ qua tài khoản vì đã disabled)
    const isValid = 
        kiemTraTen(hoTen) &&
        kiemTraEmail(email) &&
        kiemTraMatKhau(matKhau) &&
        kiemTraNgayLam(ngayLam) &&
        kiemTraLuongCoBan(luongCoBan) &&
        kiemTraChucVu(chucVu) &&
        kiemTraGioLam(gioLam);

    if (!isValid) {
        return;
    }

    const index = danhSachNhanVien.findIndex(nv => nv.taiKhoan === taiKhoan);
    if (index !== -1) {
        danhSachNhanVien[index] = layThongTinNhanVien();
        luuLocalStorage();
        hienThiDanhSach(danhSachNhanVien);
        xoaForm();
        document.getElementById('tknv').disabled = false;
        $('#myModal').modal('hide');
    }
}

// Tìm kiếm nhân viên theo xếp loại
function timKiemNhanVien() {
    const keyword = document.getElementById('searchName').value.toLowerCase().trim();
    
    if (keyword === '') {
        hienThiDanhSach(danhSachNhanVien);
        return;
    }

    const ketQua = danhSachNhanVien.filter(nv => {
        const nhanVien = new NhanVien(
            nv.taiKhoan,
            nv.hoTen,
            nv.email,
            nv.matKhau,
            nv.ngayLam,
            nv.luongCoBan,
            nv.chucVu,
            nv.gioLam
        );
        return nhanVien.xepLoai().toLowerCase().includes(keyword);
    });

    hienThiDanhSach(ketQua);
}

// Sắp xếp tăng dần theo tài khoản
function sapXepTang() {
    danhSachNhanVien.sort((a, b) => a.taiKhoan.localeCompare(b.taiKhoan));
    hienThiDanhSach(danhSachNhanVien);
}

// Sắp xếp giảm dần theo tài khoản
function sapXepGiam() {
    danhSachNhanVien.sort((a, b) => b.taiKhoan.localeCompare(a.taiKhoan));
    hienThiDanhSach(danhSachNhanVien);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load dữ liệu từ localStorage
    layLocalStorage();

    // Nút thêm nhân viên
    document.getElementById('btnThem').addEventListener('click', function() {
        xoaForm();
        document.getElementById('tknv').disabled = false;
        document.getElementById('btnThemNV').style.display = 'inline-block';
        document.getElementById('btnCapNhat').style.display = 'none';
    });

    // Nút thêm nhân viên trong modal
    document.getElementById('btnThemNV').addEventListener('click', themNhanVien);

    // Nút cập nhật
    document.getElementById('btnCapNhat').addEventListener('click', capNhatNhanVien);

    // Nút tìm kiếm
    document.getElementById('btnTimNV').addEventListener('click', timKiemNhanVien);

    // Tìm kiếm khi nhấn Enter
    document.getElementById('searchName').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            timKiemNhanVien();
        }
    });

    // Sắp xếp tăng
    document.getElementById('SapXepTang').addEventListener('click', sapXepTang);

    // Sắp xếp giảm
    document.getElementById('SapXepGiam').addEventListener('click', sapXepGiam);
});