import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const onePageData = 20

export function PaginationComp({ count, page, setPage }) {
    return (
        <Pagination>
            <PaginationContent>
                {
                    page > 1 && (
                        <PaginationItem className='cursor-pointer'>
                            <PaginationPrevious onClick={() => setPage(page - 1)}>
                                Previous
                            </PaginationPrevious>
                        </PaginationItem>
                    )
                }
                {
                    Array.from({ length: Math.ceil(count / onePageData) }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink onClick={() => setPage(i + 1)} isActive={i + 1 === page}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                {
                    page < Math.ceil(count / onePageData) && (
                        <PaginationItem className='cursor-pointer'>
                            <PaginationNext onClick={() => setPage(page + 1)}>
                                Next
                            </PaginationNext>
                        </PaginationItem>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}
