pnpm test
pnpm build

cd src-tauri && cargo test
# cargo build
cargo clean
pnpm tauri build